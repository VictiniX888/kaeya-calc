import { isModifierApplicable, isStatsApplicable } from '.';
import ArtifactSet from '../artifact/ArtifactSet';
import Character from '../character/Character';
import { Stats } from '../data/types';
import DamageModifier from '../modifier/DamageModifer';
import Weapon from '../weapon/Weapon';
import ArtifactSetOption from './artifactSetOptions/ArtifactSetOption';
import CharacterOption from './characterOptions/CharacterOption';
import { IModifierApplicable, IStatsApplicable } from './Option';
import WeaponOption from './weaponOptions/WeaponOption';

export enum Priority {
  Normal,
  Last,
}

interface Mixin {
  priority?: Priority;
}

export interface StatMixin extends Mixin {
  apply: (
    stats: Stats,
    talentAttackLevel: number,
    talentSkillLevel: number,
    talentBurstLevel: number,
    ascensionLevel: number
  ) => void;
}

// Do not modify stats here, use StatMixin for that purpose
export interface ModifierMixin extends Mixin {
  apply: (modifier: DamageModifier, stats: Stats) => void;
}

export type GetStatMixinsParams = {
  character: Character;
  characterOptions: CharacterOption[];
  weapon: Weapon;
  weaponOptions: WeaponOption[];
  artifactSets: ArtifactSet[];
  artifactSetOptions: ArtifactSetOption[];
  teamCharacters: Character[];
  teamOptions: CharacterOption[];
  artifactBuffOptions: ArtifactSetOption[];
};

export function getStatMixins({
  character,
  characterOptions,
  weapon,
  weaponOptions,
  artifactSets,
  artifactSetOptions,
  teamCharacters,
  teamOptions,
  artifactBuffOptions,
}: GetStatMixinsParams): StatMixin[] {
  const characterPassiveMixins = character.getPassiveStatMixins();

  const characterConstellationMixins = character.getConstellationStatMixins();

  const weaponPassiveMixins = weapon.getPassiveStatMixins();

  const artifactSetMixins = artifactSets.flatMap((artifactSet) =>
    artifactSet.getStatMixins()
  );

  const teamPassiveMixins = teamCharacters
    .map((character) => character.getTeamStatMixin())
    .filter((mixin): mixin is StatMixin => mixin !== undefined);

  const characterOptionMixins = characterOptions
    .filter((option): option is CharacterOption & IStatsApplicable =>
      isStatsApplicable(option)
    )
    .map((option) => option.statMixin);

  const weaponOptionMixins = weaponOptions
    .filter((option): option is WeaponOption & IStatsApplicable =>
      isStatsApplicable(option)
    )
    .map((option) => option.statMixin);

  const artifactSetOptionMixins = artifactSetOptions
    .filter((option): option is ArtifactSetOption & IStatsApplicable =>
      isStatsApplicable(option)
    )
    .map((option) => option.statMixin);

  const teamOptionMixins = teamOptions
    .filter((option): option is CharacterOption & IStatsApplicable =>
      isStatsApplicable(option)
    )
    .map((option) => option.statMixin);

  const artifactBuffOptionMixins = artifactBuffOptions
    .filter((option): option is ArtifactSetOption & IStatsApplicable =>
      isStatsApplicable(option)
    )
    .map((option) => option.statMixin);

  const unarrangedMixins = [
    ...characterPassiveMixins,
    ...characterConstellationMixins,
    ...weaponPassiveMixins,
    ...artifactSetMixins,
    ...teamPassiveMixins,
    ...characterOptionMixins,
    ...weaponOptionMixins,
    ...artifactSetOptionMixins,
    ...teamOptionMixins,
    ...artifactBuffOptionMixins,
  ];
  const groupedMixins = new Map<Priority, StatMixin[]>();
  unarrangedMixins.forEach((mixin) => {
    const priority = mixin.priority ?? Priority.Normal;
    const array = groupedMixins.get(priority);
    if (!array) {
      groupedMixins.set(priority, [mixin]);
    } else {
      array.push(mixin);
    }
  });

  const statMixins = [
    ...(groupedMixins.get(Priority.Normal) ?? []),
    ...(groupedMixins.get(Priority.Last) ?? []),
  ];

  return statMixins;
}

export type GetModifierMixinsParams = {
  character: Character;
  characterOptions: CharacterOption[];
  weapon: Weapon;
  weaponOptions: WeaponOption[];
  artifactSets: ArtifactSet[];
  artifactSetOptions: ArtifactSetOption[];
  teamCharacters: Character[];
  teamOptions: CharacterOption[];
  artifactBuffOptions: ArtifactSetOption[];
};

export function getModifierMixins({
  character,
  characterOptions,
  weapon,
  weaponOptions,
  artifactSets,
  artifactSetOptions,
  teamCharacters,
  teamOptions,
  artifactBuffOptions,
}: GetModifierMixinsParams): ModifierMixin[] {
  const characterPassiveMixins = character.getPassiveModifierMixins();

  const characterConstellationMixins =
    character.getConstellationModifierMixins();

  const weaponPassiveMixins = weapon.getPassiveModifierMixins();

  const artifactSetMixins = artifactSets.flatMap((artifactSet) =>
    artifactSet.getModifierMixins()
  );

  const teamPassiveMixins = teamCharacters
    .map((character) => character.getTeamModifierMixin())
    .filter((mixin): mixin is ModifierMixin => mixin !== undefined);

  const characterOptionMixins = characterOptions
    .filter((option): option is CharacterOption & IModifierApplicable =>
      isModifierApplicable(option)
    )
    .map((option) => option.modifierMixin);

  const weaponOptionMixins = weaponOptions
    .filter((option): option is WeaponOption & IModifierApplicable =>
      isModifierApplicable(option)
    )
    .map((option) => option.modifierMixin);

  const artifactSetOptionMixins = artifactSetOptions
    .filter((option): option is ArtifactSetOption & IModifierApplicable =>
      isModifierApplicable(option)
    )
    .map((option) => option.modifierMixin);

  const teamOptionMixins = teamOptions
    .filter((option): option is CharacterOption & IModifierApplicable =>
      isModifierApplicable(option)
    )
    .map((option) => option.modifierMixin);

  const artifactBuffOptionMixins = artifactBuffOptions
    .filter((option): option is ArtifactSetOption & IModifierApplicable =>
      isModifierApplicable(option)
    )
    .map((option) => option.modifierMixin);

  const unarrangedMixins = [
    ...characterPassiveMixins,
    ...characterConstellationMixins,
    ...weaponPassiveMixins,
    ...artifactSetMixins,
    ...teamPassiveMixins,
    ...characterOptionMixins,
    ...weaponOptionMixins,
    ...artifactSetOptionMixins,
    ...teamOptionMixins,
    ...artifactBuffOptionMixins,
  ];
  const groupedMixins = new Map<Priority, ModifierMixin[]>();
  unarrangedMixins.forEach((mixin) => {
    const priority = mixin.priority ?? Priority.Normal;
    const array = groupedMixins.get(priority);
    if (!array) {
      groupedMixins.set(priority, [mixin]);
    } else {
      array.push(mixin);
    }
  });

  const modifierMixins = [
    ...(groupedMixins.get(Priority.Normal) ?? []),
    ...(groupedMixins.get(Priority.Last) ?? []),
  ];

  return modifierMixins;
}
