import { AppState } from '../App';
import ArtifactSet from '../js/artifact/ArtifactSet';
import Character from '../js/character/Character';
import CritType from '../js/modifier/CritType';
import Resistance from '../js/Resistance';
import { Element } from '../js/talent/types';
import Weapon from '../js/weapon/Weapon';

export default interface Save {
  label: string;

  characterId?: string;
  characterLevel?: number;
  characterHasAscended?: boolean;

  weaponId?: string;
  weaponLevel?: number;
  weaponHasAscended?: boolean;

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
}

export type Saves = Record<string, Save>;

export function createSave(label: string, appState: AppState): Save {
  const save: Save = {
    label,

    characterId: appState.character.id,
    characterLevel: appState.character.level,
    characterHasAscended: appState.character.hasAscended,

    weaponId: appState.weapon.id,
    weaponLevel: appState.weapon.weaponLevel,
    weaponHasAscended: appState.weapon.hasAscended,

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
  };

  return save;
}

export function loadSave(
  save: Save,
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void
) {
  const character = new Character(
    save.characterId ?? '',
    save.characterLevel ?? 1,
    save.characterHasAscended ?? false
  );
  const weapon = new Weapon(
    save.weaponId ?? '',
    save.weaponLevel ?? 1,
    save.weaponHasAscended ?? false
  );
  const artifactSets = save.artifactSets?.map(
    (artifactSet) =>
      new ArtifactSet(
        artifactSet.artifactSetId ?? '',
        artifactSet.artifactSetPieces ?? 0
      )
  ) ?? [new ArtifactSet(''), new ArtifactSet(''), new ArtifactSet('')];

  const talentAttackLevel = save.talentAttackLevel ?? 1;
  const talentSkillLevel = save.talentSkillLevel ?? 1;
  const talentBurstLevel = save.talentBurstLevel ?? 1;

  const critType = save.critType ?? CritType.None;
  const enemyLevel = save.enemyLevel ?? 1;
  const enemyRes = save.enemyRes
    ? new Resistance(save.enemyRes)
    : new Resistance();

  setAppState({
    character,
    weapon,
    artifactSets,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    critType,
    enemyLevel,
    enemyRes,
  });
}

export function addSave(save: Save, saves: Saves) {
  saves[save.label] = save;
  window.localStorage.setItem('saves', JSON.stringify(saves));
}

export function getSave(label: string, saves: Saves): Save | undefined {
  return saves[label];
}
