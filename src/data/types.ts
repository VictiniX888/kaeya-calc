// Type definitions
export type Stats = Record<string, number>;
export type StatCurveMapping = Record<string, string>;
export type AscensionBonus = Record<string, number>;
export type StatCurves = Record<string, number>;
export type TalentParams = number[];
export type TalentData = Record<number, TalentParams>;
export type ArtifactSetBonusData = Record<number, ArtifactSetBonusSet>;

type ArtifactMainStatPropData = Record<string, number>;
type ArtifactMainStatLevelData = Record<number, ArtifactMainStatPropData>;
export type ArtifactMainStatData = Record<number, ArtifactMainStatLevelData>;

export interface Stat {
  stat: string;
  value: number;
}

export interface CharacterData {
  id: string;
  name: string;
  baseStats: Stats;
  statCurves: StatCurveMapping;
}

interface AscensionBonusSetRaw {
  ascensionLevel: number;
  ascensionBonuses: AscensionBonus;
}

export interface CharacterAscensionBonusDataRaw {
  characterId: string;
  ascensionBonusSet: AscensionBonusSetRaw[];
}

export interface StatCurveData {
  level: number;
  statCurves: StatCurves;
}

export interface WeaponData {
  id: string;
  name: string;
  type: string;
  rank: number;
  baseStats: Stats;
  statCurves: StatCurveMapping;
}

export interface WeaponAscensionBonusDataRaw {
  weaponId: string;
  ascensionBonusSet: AscensionBonusSetRaw[];
}

interface TalentDataRaw {
  level: number;
  params: TalentParams;
}

interface CharacterPassiveData {
  id: string;
  ascensionLevel: number;
  params: TalentParams;
}

interface ConstellationData {
  constellationLevel: number;
  params: TalentParams;
}

interface TalentDataSetRaw {
  attack: TalentDataRaw[];
  skill: TalentDataRaw[];
  burst: TalentDataRaw[];
  passives: CharacterPassiveData[];
  constellations: ConstellationData[];
}

export interface CharacterTalentDataRaw {
  characterId: string;
  talents: TalentDataSetRaw;
}

export interface TalentDataSet {
  attack: TalentData;
  skill: TalentData;
  burst: TalentData;
  passives: CharacterPassiveData[];
  constellations: ConstellationData[];
}

export interface ArtifactSetData {
  id: string;
  name: string;
  bonusThresholds: number[];
}

export interface ArtifactSetBonusDataRaw {
  setId: string;
  setBonusSet: ArtifactSetBonusSet[];
}

export interface ArtifactSetBonusSet {
  bonusThreshold: number;
  bonuses: Stat[];
  bonusExtra: {
    type: string;
    params: number[];
  };
}

export interface WeaponPassiveData {
  refinement: number;
  statBonuses: Stat[];
  passiveId: string;
  passiveParams: number[];
}

export interface WeaponPassiveSetData {
  id: string;
  passive: Record<number, WeaponPassiveData>;
}

// Mapping files
interface PropInfo {
  name: string;
  isPercentage: boolean;
}

export type PropMapping = Record<string, PropInfo>;

export type LanguageMapping = Record<string, string>;
