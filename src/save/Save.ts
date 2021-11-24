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
import Option from '../option/Option';
import ReactionOption from '../option/characterOptions/ReactionOption';
import artifactTeamBuffs from '../teambuff/artifact/ArtifactTeamBuff';
import SwirlOption from '../option/characterOptions/SwirlOption';
import Attack from '../dps/Attack';
import OHCAttack from '../dps/OHCAttack';

// Type definitions

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

  characterOptions?: OptionSave[];
  weaponOptions?: OptionSave[];
  artifactSetOptions?: OptionSave[];
  teamOptions?: OptionSave[];
  artifactBuffOptions?: OptionSave[];

  swirlElement?: string;

  rotationTime?: number;
  rotation?: AttackSave[];
  ohcRotation?: OHCAttackSave[];
}

export type Saves = Record<string, Save>;

export interface ArtifactSave {
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

interface OptionSave {
  id?: string;
  value?: unknown;
}

interface AttackSave {
  talentType?: string;
  talentId?: string;
  multiplier?: number;
  options?: OptionSave[];
}

interface OHCAttackSave {
  heals?: AttackSave[];
  multiplier?: number;
  options?: OptionSave[];
}

// Creating saves

function createInputStatSave({
  stat,
  value,
  rawValue,
}: InputStat): InputStatSave {
  return { stat, value, rawValue };
}

export function createArtifactSave(artifact: Artifact): ArtifactSave {
  return {
    type: artifact.type,
    rarity: artifact.rarity,
    level: artifact.level,
    mainStat: artifact.mainStat.stat,
    subStats: artifact.subStats.map((subStat) => createInputStatSave(subStat)),
  };
}

function createOptionSave(option: Option): OptionSave {
  return { id: option.id, value: getOptionValue(option) };
}

function createAttackSave(attack: Attack): AttackSave {
  return {
    talentType: attack.talentType,
    talentId: attack.talentId,
    multiplier: attack.multiplier,
    options: attack.options.map(createOptionSave),
  };
}

function createOHCAttackSave(attack: OHCAttack): OHCAttackSave {
  return {
    heals: attack.heals.map(createAttackSave),
    multiplier: attack.multiplier,
    options: attack.options.map(createOptionSave),
  };
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

    artifacts: appState.artifacts.map((artifact) =>
      createArtifactSave(artifact)
    ),

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

    characterOptions: appState.characterOptions.map(createOptionSave),
    weaponOptions: appState.weaponOptions.map(createOptionSave),
    artifactSetOptions: appState.artifactSetOptions.map(createOptionSave),
    teamOptions: appState.teamOptions.map(createOptionSave),
    artifactBuffOptions: appState.artifactBuffOptions.map(createOptionSave),

    swirlElement: appState.swirlOption.value,

    rotationTime: appState.rotationTime,
    rotation: appState.rotation.map(createAttackSave),
    ohcRotation: appState.ohcRotation.map(createOHCAttackSave),
  };

  return save;
}

// Unpacking saves

export function unpackArtifactSave(save: ArtifactSave, i: number): Artifact {
  const artifactType = save.type ?? Object.values(ArtifactType)[i];
  let artifact = new Artifact(
    artifactType,
    save.rarity ?? 1,
    save.level ?? 0,
    save.mainStat ?? ''
  );
  artifact.subStats =
    save.subStats?.map(
      (subStat) =>
        new InputStat(
          subStat.stat ?? '',
          subStat.value ?? NaN,
          subStat.rawValue ?? NaN
        )
    ) ?? artifact.subStats;

  return artifact;
}

const unpackOptionSave = (options: Option[]) => (save: OptionSave) => {
  let option = options.find((option) => option.id === save.id);
  if (option !== undefined) {
    setOptionValue(option, save.value);
  }
};

const unpackAttackOptionSave =
  (allOptions: Option[]) =>
  ({ id, value }: OptionSave): Option | undefined => {
    const OptionConstructor = allOptions.find((option) => option.id === id)
      ?.constructor as { new (): Option };
    let option;
    if (OptionConstructor !== undefined) {
      option = new OptionConstructor();
      setOptionValue(option, value);
    } else if (id === 'reaction') {
      option = new ReactionOption();
      setOptionValue(option, value);
    }
    return option;
  };

const unpackAttackSave =
  (allOptions: Option[]) =>
  (save: AttackSave): Attack => {
    return {
      talentType: save.talentType ?? '',
      talentId: save.talentId ?? '',
      multiplier: save.multiplier ?? 1,
      talentValue: { damage: [NaN] },
      options:
        save.options
          ?.map(unpackAttackOptionSave(allOptions))
          ?.filter((option): option is Option => option !== undefined) ?? [],
    };
  };

const unpackOHCAttackSave =
  (allOptions: Option[]) =>
  (save: OHCAttackSave): OHCAttack => {
    return {
      heals: save.heals?.map(unpackAttackSave(allOptions)) ?? [],
      multiplier: save.multiplier ?? 1,
      talentValue: { damage: [NaN] },
      options:
        save.options
          ?.map(unpackAttackOptionSave(allOptions))
          ?.filter((option): option is Option => option !== undefined) ?? [],
    };
  };

export function unpackSave(save: Save): AppState {
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
    save.artifacts?.map((artifactSave, i) =>
      unpackArtifactSave(artifactSave, i)
    ) ??
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
  save.characterOptions?.forEach(unpackOptionSave(characterOptions));

  const weaponOptions = weapon.passiveOptions;
  save.weaponOptions?.forEach(unpackOptionSave(weaponOptions));

  const artifactSetOptions = artifactSets.flatMap(
    (artifactSet) => artifactSet.options
  );
  save.artifactSetOptions?.forEach(unpackOptionSave(artifactSetOptions));

  const teamOptions = teamCharacters.flatMap(
    (character) => character.teamOptions
  );
  save.teamOptions?.forEach(unpackOptionSave(teamOptions));

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

  const swirlOption = new SwirlOption();
  setOptionValue(swirlOption, save.swirlElement ?? '');

  const allOptions = [
    ...characterOptions,
    ...weaponOptions,
    ...artifactSetOptions,
    ...teamOptions,
    ...artifactBuffOptions,
    swirlOption,
  ];

  const rotationTime = save.rotationTime ?? 0;
  const rotation: Attack[] =
    save.rotation?.map(unpackAttackSave(allOptions)) ?? [];
  const ohcRotation: OHCAttack[] =
    save.ohcRotation?.map(unpackOHCAttackSave(allOptions)) ?? [];

  return {
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
    swirlOption,
    rotationTime,
    rotation,
    ohcRotation,
  };
}

// Load save into appstate

export function loadSave(
  save: Save,
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void,
  refreshApp: () => void
) {
  const appState = unpackSave(save);

  setAppState(
    appState,

    // Update stats and talents
    refreshApp
  );
}

// Add/delete saves (used in GUI)

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
