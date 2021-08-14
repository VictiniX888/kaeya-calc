// Type definitions
export type Stats = Record<string, number>;
export type StatCurveMapping = Record<string, string>;
export type AscensionBonus = Record<string, number>;
export type StatCurves = Record<string, number>;
export type TalentParams = number[];
export type TalentData = Record<number, TalentParams>;
export type ArtifactSetBonus = Record<number, ArtifactSetBonusSet>;

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

interface PassiveDataRaw {
  curveData: TalentDataRaw;
  ascensionLevel: number;
}

interface TalentDataSetRaw {
  attack: TalentDataRaw[];
  skill: TalentDataRaw[];
  burst: TalentDataRaw[];
  passives: PassiveDataRaw[];
}

export interface CharacterTalentDataRaw {
  characterId: string;
  talents: TalentDataSetRaw;
}

interface PassiveData {
  params: TalentParams;
  ascensionLevel: number;
}

export interface TalentDataSet {
  attack: TalentData;
  skill: TalentData;
  burst: TalentData;
  passives: PassiveData[];
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

// Mapping files
interface PropInfo {
  name: string;
  isPercentage: boolean;
}
export type PropMapping = Record<string, PropInfo>;

export type LanguageMapping = Record<string, string>;
