import { AppState } from '../App';
import Artifact from '../artifact/Artifact';
import { initArtifactSet } from '../artifact/ArtifactSetUtil';
import { ArtifactType, InputStat } from '../artifact/types';
import { initCharacter } from '../character/CharacterUtil';
import CritType from '../modifier/CritType';
import Reaction from '../modifier/Reaction';
import { getOptionValue, setOptionValue } from '../option';
import Resistance from '../stat/Resistance';
import { Element } from '../talent/types';
import { initWeapon } from '../weapon/WeaponUtil';
import { Attack } from '../component/DPSColumn';
import Option from '../option/Option';
import ReactionOption from '../option/characterOptions/ReactionOption';
import artifactTeamBuffs from '../teambuff/artifact/ArtifactTeamBuff';

export default interface Save {
  label: string;

  characterId?: string;
  characterLevel?: number;
  characterHasAscended?: boolean;
  characterConstellationLevel?: number;

  weaponId?: string;
  weaponLevel?: number;
  weaponHasAscended?: boolean;
  weaponRefinement?: number;

  artifacts?: ArtifactSave[];

  artifactSets?: { artifactSetId?: string; artifactSetPieces?: number }[];

  talentAttackLevel?: number;
  talentSkillLevel?: number;
  talentBurstLevel?: number;

  critType?: CritType;
  enemyLevel?: number;
  enemyRes?: {
    anemo?: number;
    cryo?: number;
    electro?: number;
    geo?: number;
    hydro?: number;
    pyro?: number;
    physical?: number;
  };
  reaction?: Reaction;

  teamCharacterIds?: string[];

  characterOptions?: { id?: string; value?: unknown }[];
  weaponOptions?: { id?: string; value?: unknown }[];
  artifactSetOptions?: { id?: string; value?: unknown }[];
  teamOptions?: { id?: string; value?: unknown }[];
  artifactBuffOptions?: { id?: string; value?: unknown }[];

  rotationTime?: number;
  rotation?: AttackSave[];
}

export type Saves = Record<string, Save>;

interface ArtifactSave {
  type?: ArtifactType;
  rarity?: number;
  level?: number;
  mainStat?: string;
  subStats?: InputStatSave[];
}

interface InputStatSave {
  stat?: string;
  value?: number;
  rawValue?: number;
}

interface AttackSave {
  talentType?: string;
  talentId?: string;
  multiplier?: number;
  options?: { id?: string; value?: unknown }[];
}

function createInputStatSave({
  stat,
  value,
  rawValue,
}: InputStat): InputStatSave {
  return { stat, value, rawValue };
}

export function createSave(label: string, appState: AppState): Save {
  const save: Save = {
    label,

    characterId: appState.character.id,
    characterLevel: appState.character.level,
    characterHasAscended: appState.character.hasAscended,
    characterConstellationLevel: appState.character.constellationLevel,

    weaponId: appState.weapon.id,
    weaponLevel: appState.weapon.weaponLevel,
    weaponHasAscended: appState.weapon.hasAscended,
    weaponRefinement: appState.weapon.refinement,

    artifacts: appState.artifacts.map((artifact) => {
      return {
        type: artifact.type,
        rarity: artifact.rarity,
        level: artifact.level,
        mainStat: artifact.mainStat.stat,
        subStats: artifact.subStats.map((subStat) =>
          createInputStatSave(subStat)
        ),
      };
    }),

    artifactSets: appState.artifactSets.map((artifactSet) => {
      return {
        artifactSetId: artifactSet.id,
        artifactSetPieces: artifactSet.pieces,
      };
    }),

    talentAttackLevel: appState.talentAttackLevel,
    talentSkillLevel: appState.talentSkillLevel,
    talentBurstLevel: appState.talentBurstLevel,

    critType: appState.critType,
    enemyLevel: appState.enemyLevel,
    enemyRes: {
      anemo: appState.enemyRes.get(Element.Anemo),
      cryo: appState.enemyRes.get(Element.Cryo),
      electro: appState.enemyRes.get(Element.Electro),
      geo: appState.enemyRes.get(Element.Geo),
      hydro: appState.enemyRes.get(Element.Hydro),
      pyro: appState.enemyRes.get(Element.Pyro),
      physical: appState.enemyRes.get(Element.Physical),
    },
    reaction: appState.reaction,

    teamCharacterIds: appState.teamCharacters.map((character) => character.id),

    characterOptions: appState.characterOptions.map((option) => {
      return { id: option.id, value: getOptionValue(option) };
    }),
    weaponOptions: appState.weaponOptions.map((option) => {
      return { id: option.id, value: getOptionValue(option) };
    }),
    artifactSetOptions: appState.artifactSetOptions.map((option) => {
      return { id: option.id, value: getOptionValue(option) };
    }),
    teamOptions: appState.teamOptions.map((option) => {
      return { id: option.id, value: getOptionValue(option) };
    }),
    artifactBuffOptions: appState.artifactBuffOptions.map((option) => {
      return { id: option.id, value: getOptionValue(option) };
    }),

    rotationTime: appState.rotationTime,
    rotation: appState.rotation.map((attack) => {
      return {
        talentType: attack.talentType,
        talentId: attack.talentId,
        multiplier: attack.multiplier,
        options: attack.options.map((option) => {
          return { id: option.id, value: getOptionValue(option) };
        }),
      };
    }),
  };

  return save;
}

export function loadSave(
  save: Save,
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void,
  refreshApp: () => void
) {
  const character = initCharacter(
    save.characterId,
    save.characterLevel,
    save.characterHasAscended,
    save.characterConstellationLevel
  );
  const weapon = initWeapon(
    save.weaponId,
    save.weaponLevel,
    save.weaponHasAscended,
    save.weaponRefinement
  );

  const artifacts =
    save.artifacts?.map((savedArtifact, i) => {
      const artifactType = savedArtifact.type ?? Object.values(ArtifactType)[i];
      let artifact = new Artifact(
        artifactType,
        savedArtifact.rarity ?? 1,
        savedArtifact.level ?? 0,
        savedArtifact.mainStat ?? ''
      );
      artifact.subStats =
        savedArtifact.subStats?.map(
          (subStat) =>
            new InputStat(
              subStat.stat ?? '',
              subStat.value ?? NaN,
              subStat.rawValue ?? NaN
            )
        ) ?? artifact.subStats;

      return artifact;
    }) ??
    Object.values(ArtifactType).map((type) => new Artifact(type, 1, 0, ''));

  const artifactSets = save.artifactSets?.map((artifactSet) =>
    initArtifactSet(artifactSet.artifactSetId, artifactSet.artifactSetPieces)
  ) ?? [initArtifactSet(), initArtifactSet(), initArtifactSet()];

  const talentAttackLevel = save.talentAttackLevel ?? 1;
  const talentSkillLevel = save.talentSkillLevel ?? 1;
  const talentBurstLevel = save.talentBurstLevel ?? 1;

  const critType = save.critType ?? CritType.None;
  const enemyLevel = save.enemyLevel ?? 1;
  const enemyRes = save.enemyRes
    ? new Resistance(save.enemyRes)
    : new Resistance();
  const reaction = save.reaction ?? Reaction.None;

  const teamCharacters = save.teamCharacterIds?.map((id) =>
    initCharacter(id)
  ) ?? [initCharacter(), initCharacter(), initCharacter()];

  const characterOptions = character.getOptions();
  save.characterOptions?.forEach((option) => {
    let characterOption = characterOptions.find(
      (characterOption) => characterOption.id === option.id
    );
    if (characterOption !== undefined) {
      setOptionValue(characterOption, option.value);
    }
  });

  const weaponOptions = weapon.passiveOptions;
  save.weaponOptions?.forEach((option) => {
    let weaponOption = weaponOptions.find(
      (weaponOption) => weaponOption.id === option.id
    );
    if (weaponOption !== undefined) {
      setOptionValue(weaponOption, option.value);
    }
  });

  const artifactSetOptions = artifactSets.flatMap(
    (artifactSet) => artifactSet.options
  );
  save.artifactSetOptions?.forEach((option) => {
    let artifactSetOption = artifactSetOptions.find(
      (artifactSetOption) => artifactSetOption.id === option.id
    );
    if (artifactSetOption !== undefined) {
      setOptionValue(artifactSetOption, option.value);
    }
  });

  const teamOptions = teamCharacters.flatMap(
    (character) => character.teamOptions
  );
  save.teamOptions?.forEach((option) => {
    let teamOption = teamOptions.find(
      (teamOption) => teamOption.id === option.id
    );
    if (teamOption !== undefined) {
      setOptionValue(teamOption, option.value);
    }
  });

  const artifactBuffOptions =
    save.artifactBuffOptions?.flatMap((option) => {
      const OptionConstructor = artifactTeamBuffs[option.id ?? ''];
      if (OptionConstructor !== undefined) {
        let artifactOption = new OptionConstructor();
        setOptionValue(artifactOption, option.value);
        return [artifactOption];
      }

      return [];
    }) ?? [];

  const allOptions = [
    ...characterOptions,
    ...weaponOptions,
    ...artifactSetOptions,
    ...teamOptions,
    ...artifactBuffOptions,
  ];

  const rotationTime = save.rotationTime ?? 0;
  const rotation: Attack[] =
    save.rotation?.map((attackSave) => {
      return {
        talentType: attackSave.talentType ?? '',
        talentId: attackSave.talentId ?? '',
        multiplier: attackSave.multiplier ?? 1,
        talentValue: { damage: [NaN] },
        options:
          attackSave.options
            ?.map(({ id, value }) => {
              const OptionConstructor = allOptions.find(
                (option) => option.id === id
              )?.constructor as { new (): Option };
              let option;
              if (OptionConstructor !== undefined) {
                option = new OptionConstructor();
                setOptionValue(option, value);
              } else if (id === 'reaction') {
                option = new ReactionOption();
                setOptionValue(option, value);
              }
              return option;
            })
            ?.filter((option): option is Option => option !== undefined) ?? [],
      };
    }) ?? [];

  setAppState(
    {
      character,
      weapon,
      artifacts,
      artifactSets,
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
      critType,
      enemyLevel,
      enemyRes,
      reaction,
      teamCharacters,
      characterOptions,
      weaponOptions,
      artifactSetOptions,
      teamOptions,
      artifactBuffOptions,
      rotationTime,
      rotation,
    },

    // Update stats and talents
    refreshApp
  );
}

export function addSave(save: Save, saves: Saves) {
  saves[save.label] = save;
  window.localStorage.setItem('saves', JSON.stringify(saves));
}

export function getSave(label: string, saves: Saves): Save | undefined {
  return saves[label];
}

export function deleteSave(label: string, saves: Saves) {
  delete saves[label];
  window.localStorage.setItem('saves', JSON.stringify(saves));
}
