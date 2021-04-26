import characterDataRaw from '../data/characterdata.json';
import characterAscensionBonusDataRaw from '../data/characterascensionbonusdata.json';
import characterStatCurveDataRaw from '../data/characterstatcurvedata.json';
import weaponDataRaw from '../data/weapondata.json';
import weaponAscensionBonusDataRaw from '../data/weaponascensionbonusdata.json';
import weaponStatCurveDataRaw from '../data/weaponstatcurvedata.json';
//import artifactSetDataRaw from '../data/artifactsetdata.json';
//import artifactSetBonusDataRaw from '../data/artifactsetbonusdata.json';
import talentDataRaw from '../data/talentdata.json';
export { default as propMapping } from '../data/propmapping.json';
export { default as talentDescMapping } from '../data/talentdescmapping.json';

// Pre-processed data, coverting from arrays to objects (map-like) for faster lookup
const characterData = processCharacterData(characterDataRaw);
const characterAscensionBonusData = processCharacterAscensionBonusData(characterAscensionBonusDataRaw);
const characterStatCurveData = processCharacterStatCurveData(characterStatCurveDataRaw);
const weaponData = processWeaponData(weaponDataRaw);
const weaponAscensionBonusData = processWeaponAscensionBonusData(weaponAscensionBonusDataRaw);
const weaponStatCurveData = processWeaponStatCurveData(weaponStatCurveDataRaw);
const talentData = processTalentData(talentDataRaw);

// Pre-processed data, lists
let sortedCharacterList;    // lazy loading implemented with getSortedCharacterList()
let sortedWeaponList;       // lazy loading implemented with getSortedWeaponList()

// Functions for pre-processing data
function processCharacterData(rawData) {
    return rawData.reduce((acc, charData) => {
        acc[charData.id] = charData;
        return acc;
    }, {});
}

function processCharacterAscensionBonusData(rawData) {
    return rawData.reduce((acc, charData) => {
        acc[charData.characterId] = charData.ascensionBonusSet.map(bonusData => bonusData.ascensionBonuses);
        return acc;
    }, {});
}

function processCharacterStatCurveData(rawData) {
    return rawData.reduce((acc, curveData) => {
        acc[curveData.level] = curveData.statCurves;
        return acc;
    }, {});
}

function processWeaponData(rawData) {
    return rawData.reduce((acc, weaponData) => {
        acc[weaponData.id] = weaponData;
        return acc;
    }, {});
}

function processWeaponAscensionBonusData(rawData) {
    return rawData.reduce((acc, weaponData) => {
        acc[weaponData.weaponId] = weaponData.ascensionBonusSet.map(bonusData => bonusData.ascensionBonuses);
        return acc;
    }, {});
}

function processWeaponStatCurveData(rawData) {
    return rawData.reduce((acc, curveData) => {
        acc[curveData.level] = curveData.statCurves;
        return acc;
    }, {});
}

function processTalentData(rawData) {
    return rawData.reduce((acc, talentDataRaw) => {
        let talentData = {...talentDataRaw.talents};

        talentData.attack = talentData.attack.reduce((curveAcc, curveData) => {
            curveAcc[curveData.level] = curveData.params;
            return curveAcc;
        }, {});
        talentData.skill = talentData.skill.reduce((curveAcc, curveData) => {
            curveAcc[curveData.level] = curveData.params;
            return curveAcc;
        }, {});
        talentData.burst = talentData.burst.reduce((curveAcc, curveData) => {
            curveAcc[curveData.level] = curveData.params;
            return curveAcc;
        }, {});

        acc[talentDataRaw.characterId] = talentData;
        return acc;
    }, {});
}

// Helper functions for accessing data properties
function getData(id, dataObj) {
    return dataObj[id];
}

function getAscensionBonusData(id, dataObj) {
    return dataObj[id];
}

function getStatCurveAt(level, statCurves) {
    return statCurves[level];
}

// "Public" functions for accessing data properties
export function getCharacterData(id) {
    return getData(id, characterData);
}

export function getCharacterAscensionBonusData(id) {
    return getAscensionBonusData(id, characterAscensionBonusData);
}

export function getCharacterStatCurveAt(level) {
    return getStatCurveAt(level, characterStatCurveData);
}

export function getWeaponData(id) {
    return getData(id, weaponData);
}

export function getWeaponAscensionBonusData(id) {
    return getAscensionBonusData(id, weaponAscensionBonusData);
}

export function getWeaponStatCurveAt(level) {
    return getStatCurveAt(level, weaponStatCurveData);
}

export function getAscensionBonusAt(level, ascensionBonuses) {
    return ascensionBonuses[level];
}

export function getTalentData(id) {
    return talentData[id];
}

export function getTalentStatsAt(type, level, talents) {
    return talents[type][level];
}

// "Public" functions for getting data collections
export function getSortedCharacterList() {
    if (sortedCharacterList === undefined) {
        sortedCharacterList = Object.entries(characterData)
            .sort(([_1, {name: name1}], [_2, {name: name2}]) => name1.localeCompare(name2))
            .map(([id, _]) => id);
    }

    return sortedCharacterList;
}

export function getSortedWeaponList() {
    if (sortedWeaponList === undefined) {
        sortedWeaponList = Object.entries(weaponData)
            .sort(([_1, {name: name1}], [_2, {name: name2}]) => name1.localeCompare(name2))
            .map(([id, _]) => id);
    }

    return sortedWeaponList;
}