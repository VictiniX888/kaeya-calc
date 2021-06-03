import type * as Data from '../data/types';

import characterDataRaw from '../data/characterdata.json';
import characterAscensionBonusDataRaw from '../data/characterascensionbonusdata.json';
import characterStatCurveDataRaw from '../data/characterstatcurvedata.json';
import weaponDataRaw from '../data/weapondata.json';
import weaponAscensionBonusDataRaw from '../data/weaponascensionbonusdata.json';
import weaponStatCurveDataRaw from '../data/weaponstatcurvedata.json';
import talentDataRaw from '../data/talentdata.json';
import artifactSetDataRaw from '../data/artifactsetdata.json';
import artifactSetBonusDataRaw from '../data/artifactsetbonusdata.json';

import propMappingRaw from '../data/propmapping.json';
import talentDescMappingRaw from '../data/talentdescmapping.json';
import optionMappingRaw from '../data/optionmapping.json';

// Mappings
export const propMapping = propMappingRaw as Data.PropMapping;
export const talentDescMapping = talentDescMappingRaw as Data.LanguageMapping;
export const optionMapping = optionMappingRaw as Data.LanguageMapping;

// Pre-processed data, coverting from arrays to objects (map-like) for faster lookup
const characterData = processCharacterData(
  characterDataRaw as Data.CharacterData[]
);
const characterAscensionBonusData = processCharacterAscensionBonusData(
  characterAscensionBonusDataRaw as Data.CharacterAscensionBonusDataRaw[]
);
const characterStatCurveData = processCharacterStatCurveData(
  characterStatCurveDataRaw as Data.StatCurveData[]
);
const weaponData = processWeaponData(
  weaponDataRaw as unknown as Data.WeaponData[]
);
const weaponAscensionBonusData = processWeaponAscensionBonusData(
  weaponAscensionBonusDataRaw as Data.WeaponAscensionBonusDataRaw[]
);
const weaponStatCurveData = processWeaponStatCurveData(
  weaponStatCurveDataRaw as Data.StatCurveData[]
);
const talentData = processTalentData(
  talentDataRaw as Data.CharacterTalentDataRaw[]
);
const artifactSetData = processArtifactSetData(
  artifactSetDataRaw as Data.ArtifactSetData[]
);
const artifactSetBonusData = processArtifactSetBonusData(
  artifactSetBonusDataRaw as Data.ArtifactSetBonusDataRaw[]
);

// Pre-processed data, lists
let sortedCharacterList: string[]; // lazy loading implemented with getSortedCharacterList()
let sortedWeaponList: string[]; // lazy loading implemented with getSortedWeaponList()
let sortedArtifactSetList: string[]; // lazy loading implemented with getSortedArtifactSetList()

// Functions for pre-processing data
function processCharacterData(rawData: Data.CharacterData[]) {
  return rawData.reduce((acc, charData) => {
    acc[charData.id] = charData;
    return acc;
  }, {} as Record<string, Data.CharacterData>);
}

function processCharacterAscensionBonusData(
  rawData: Data.CharacterAscensionBonusDataRaw[]
) {
  return rawData.reduce((acc, charData) => {
    acc[charData.characterId] = charData.ascensionBonusSet.map(
      (bonusData) => bonusData.ascensionBonuses
    );
    return acc;
  }, {} as Record<string, Data.AscensionBonus[]>);
}

function processCharacterStatCurveData(rawData: Data.StatCurveData[]) {
  return rawData.reduce((acc, curveData) => {
    acc[curveData.level] = curveData.statCurves;
    return acc;
  }, {} as Record<number, Data.StatCurves>);
}

function processWeaponData(rawData: Data.WeaponData[]) {
  return rawData.reduce((acc, weaponData) => {
    acc[weaponData.id] = weaponData;
    return acc;
  }, {} as Record<string, Data.WeaponData>);
}

function processWeaponAscensionBonusData(
  rawData: Data.WeaponAscensionBonusDataRaw[]
) {
  return rawData.reduce((acc, weaponData) => {
    acc[weaponData.weaponId] = weaponData.ascensionBonusSet.map(
      (bonusData) => bonusData.ascensionBonuses
    );
    return acc;
  }, {} as Record<string, Data.AscensionBonus[]>);
}

function processWeaponStatCurveData(rawData: Data.StatCurveData[]) {
  return rawData.reduce((acc, curveData) => {
    acc[curveData.level] = curveData.statCurves;
    return acc;
  }, {} as Record<number, Data.StatCurves>);
}

function processTalentData(rawData: Data.CharacterTalentDataRaw[]) {
  return rawData.reduce((acc, talentDataRaw) => {
    const talentDataSetRaw = talentDataRaw.talents;

    let talentData: Data.TalentDataSet = {
      attack: talentDataSetRaw.attack.reduce((curveAcc, curveData) => {
        curveAcc[curveData.level] = curveData.params;
        return curveAcc;
      }, {} as Data.TalentData),
      skill: talentDataSetRaw.skill.reduce((curveAcc, curveData) => {
        curveAcc[curveData.level] = curveData.params;
        return curveAcc;
      }, {} as Data.TalentData),
      burst: talentDataSetRaw.burst.reduce((curveAcc, curveData) => {
        curveAcc[curveData.level] = curveData.params;
        return curveAcc;
      }, {} as Data.TalentData),
    };

    acc[talentDataRaw.characterId] = talentData;
    return acc;
  }, {} as Record<string, Data.TalentDataSet>);
}

function processArtifactSetData(rawData: Data.ArtifactSetData[]) {
  return rawData.reduce((acc, setData) => {
    acc[setData.id] = setData;
    return acc;
  }, {} as Record<string, Data.ArtifactSetData>);
}

function processArtifactSetBonusData(rawData: Data.ArtifactSetBonusDataRaw[]) {
  return rawData.reduce((acc, setData) => {
    acc[setData.setId] = setData.setBonusSet.reduce((bonusAcc, bonusData) => {
      bonusAcc[bonusData.bonusThreshold] = bonusData;
      return bonusAcc;
    }, {} as Record<number, Data.ArtifactSetBonusSet>);
    return acc;
  }, {} as Record<string, Data.ArtifactSetBonus>);
}

// Helper functions for accessing data properties
function getData(id: string, dataObj: Record<string, any>) {
  return dataObj[id];
}

function getAscensionBonusData(
  id: string,
  dataObj: Record<string, Data.AscensionBonus[]>
) {
  return dataObj[id];
}

function getStatCurveAt(
  level: number,
  statCurves: Record<number, Data.StatCurves>
) {
  return statCurves[level];
}

// "Public" functions for accessing data properties
export function getCharacterData(id: string): Data.CharacterData {
  return getData(id, characterData);
}

export function getCharacterAscensionBonusData(id: string) {
  return getAscensionBonusData(id, characterAscensionBonusData);
}

export function getCharacterStatCurveAt(level: number) {
  return getStatCurveAt(level, characterStatCurveData);
}

export function getWeaponData(id: string): Data.WeaponData {
  return getData(id, weaponData);
}

export function getWeaponAscensionBonusData(id: string) {
  return getAscensionBonusData(id, weaponAscensionBonusData);
}

export function getWeaponStatCurveAt(level: number) {
  return getStatCurveAt(level, weaponStatCurveData);
}

export function getAscensionBonusAt(
  level: number,
  ascensionBonuses: Data.AscensionBonus[]
) {
  return ascensionBonuses[level];
}

export function getTalentData(id: string) {
  return talentData[id];
}

const emptyTalentParams: number[] = Array(19).fill(NaN);

export function getTalentStatsAt(
  type: 'attack' | 'skill' | 'burst',
  level: number,
  talents: Data.TalentDataSet
) {
  const talentStats = talents[type][level];
  if (talentStats !== undefined) {
    return talentStats;
  } else {
    return emptyTalentParams;
  }
}

export function getArtifactSetData(id: string): Data.ArtifactSetData {
  return getData(id, artifactSetData);
}

export function getArtifactSetBonusData(id: string): Data.ArtifactSetBonus {
  return getData(id, artifactSetBonusData);
}

export function getArtifactSetBonusParams(id: string, pieces: number) {
  const params = getArtifactSetBonusData(id)?.[pieces]?.bonusExtra?.params;
  return params ?? emptyTalentParams;
}

// "Public" functions for getting data collections
export function getSortedCharacterList() {
  if (sortedCharacterList === undefined) {
    sortedCharacterList = Object.entries(characterData)
      .sort(([_1, { name: name1 }], [_2, { name: name2 }]) =>
        name1.localeCompare(name2)
      )
      .map(([id, _]) => id);
  }

  return sortedCharacterList;
}

export function getSortedWeaponList() {
  if (sortedWeaponList === undefined) {
    sortedWeaponList = Object.entries(weaponData)
      .sort(([_1, { name: name1 }], [_2, { name: name2 }]) =>
        name1.localeCompare(name2)
      )
      .map(([id, _]) => id);
  }

  return sortedWeaponList;
}

export function getSortedArtifactSetList() {
  if (sortedArtifactSetList === undefined) {
    sortedArtifactSetList = Object.entries(artifactSetData)
      .sort(([_1, { name: name1 }], [_2, { name: name2 }]) =>
        name1.localeCompare(name2)
      )
      .map(([id, _]) => id);
  }

  return sortedArtifactSetList;
}
