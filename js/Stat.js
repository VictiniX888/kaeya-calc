import { talentDescMapping, talentOptionMapping } from './Data.js';

// Returns the string to display as the value of a stat
export function getStatDisplayValue(value, isPercentage) {
    if (value != null) {
        if (isPercentage) {
            return (value * 100).toFixed(1) + "%";
        } else {
            return Math.round(value);
        }
    } else {
        return "-";
    }
};

// Returns the string to display as the talent damage
export function getDamageDisplayValue(values) {
    let str = '';

    if (isNaN(values[0])) {
        return '-';
    } else {
        str += Math.round(values[0]);
    }

    values.slice(1).forEach(value => {
        if (isNaN(value)) {
            return '-';
        } else {
            str += ' + ' + Math.round(value);
        }
    });

    return str;
}

// Returns the display name of a talent option
export function getTalentOptionName(id) {
    return talentOptionMapping[id];
}

// Returns a Number representing the inputed value of a stat
// Returns null if the input is not a valid stat value
export function convertStatValue(value, isPercentage) {
    if (isPercentage) {
        return value / 100;
    } else {
        return value;
    }
};

export function getTalentDescription(desc) {
    return talentDescMapping[desc];
}

// Returns object containing base stats of character with the passed weapon
// Base stats = character innate stats + weapon stats
function getBaseStatsAt(weapon, weaponLevel, weaponHasAscended, character, characterLevel, characterHasAscended) {

    let weaponStats;
    if (weapon !== undefined) {
        weaponStats = weapon.getStatsAt(weaponLevel, weaponHasAscended);
    } else {
        weaponStats = {};
    }

    let characterStats;
    if (character !== undefined) {
        characterStats = character.getInnateStatsAt(characterLevel, characterHasAscended);
    } else {
        characterStats = {};
    }
    
    // Merges weaponStats and innateStats into a new baseStats object
    let baseStats = {...weaponStats};
    Object.entries(characterStats).map(([stat, value]) => {
        if (baseStats[stat] === undefined) {
            baseStats[stat] = value;
        } else {
            baseStats[stat] += value;
        }
    });
    
    return baseStats;
}

// Returns object containing the total stats of the character, weapon and artifacts
// Ignores any of [character, weapon] that are undefined
export function getTotalStatsAt(weapon, weaponLevel, weaponHasAscended, character, characterLevel, characterHasAscended, artifacts) {
    
    let baseStats = getBaseStatsAt(weapon, weaponLevel, weaponHasAscended, character, characterLevel, characterHasAscended);
    
    // Merge artifact bonuses into separate object
    let artifactStats = {};
    artifacts.forEach(artifact => {
        Object.entries(artifact.getStats()).forEach(([stat, value]) => {
            if (artifactStats[stat] === undefined) {
                artifactStats[stat] = value;
            } else {
                artifactStats[stat] += value;
            }
        });
    });

    // Merge base stats and artifact bonuses
    let combinedStats = {...baseStats};
    Object.entries(artifactStats).forEach(([stat, value]) => {
        if (combinedStats[stat] === undefined) {
            combinedStats[stat] = value;
        } else {
            combinedStats[stat] += value;
        }
    });

    // Calculate total stats
    let totalStats = {};
    totalStats.flatAtk = (combinedStats.baseAtk ? combinedStats.baseAtk : 0) 
        * (1 + (combinedStats.atkBonus ? combinedStats.atkBonus : 0))
        + (combinedStats.flatAtk ? combinedStats.flatAtk : 0);
    totalStats.flatDef = (combinedStats.baseDef ? combinedStats.baseDef : 0) 
        * (1 + (combinedStats.defBonus ? combinedStats.defBonus : 0))
        + (combinedStats.flatDef ? combinedStats.flatDef : 0);
    totalStats.flatHp = (combinedStats.baseHp ? combinedStats.baseHp : 0) 
        * (1 + (combinedStats.hpBonus ? combinedStats.hpBonus : 0))
        + (combinedStats.flatHp ? combinedStats.flatHp : 0);
    totalStats.critRate = combinedStats.critRate ? combinedStats.critRate : 0;
    totalStats.critDmg = combinedStats.critDmg ? combinedStats.critDmg : 0;
    totalStats.elementalMastery = combinedStats.elementalMastery ? combinedStats.elementalMastery : 0;
    totalStats.energyRecharge = 1 + (combinedStats.energyRecharge ? combinedStats.energyRecharge : 0);
    
    combinedStats.anemoDmgBonus ? totalStats.anemoDmgBonus = combinedStats.anemoDmgBonus : null;
    combinedStats.cryoDmgBonus ? totalStats.cryoDmgBonus = combinedStats.cryoDmgBonus : null;
    combinedStats.electroDmgBonus ? totalStats.electroDmgBonus = combinedStats.electroDmgBonus : null;
    combinedStats.geoDmgBonus ? totalStats.geoDmgBonus = combinedStats.geoDmgBonus : null;
    combinedStats.hydroDmgBonus ? totalStats.hydroDmgBonus = combinedStats.hydroDmgBonus : null;
    combinedStats.pyroDmgBonus ? totalStats.pyroDmgBonus = combinedStats.pyroDmgBonus : null;
    combinedStats.physicalDmgBonus ? totalStats.physicalDmgBonus = combinedStats.physicalDmgBonus : null;

    combinedStats.anemoRes ? totalStats.anemoRes = combinedStats.anemoRes : null;
    combinedStats.cryoRes ? totalStats.cryoRes = combinedStats.cryoRes : null;
    combinedStats.electroRes ? totalStats.electroRes = combinedStats.electroRes : null;
    combinedStats.geoRes ? totalStats.geoRes = combinedStats.geoRes : null;
    combinedStats.hydroRes ? totalStats.hydroRes = combinedStats.hydroRes : null;
    combinedStats.pyroRes ? totalStats.pyroRes = combinedStats.pyroRes : null;
    combinedStats.physicalRes ? totalStats.physicalRes = combinedStats.physicalRes : null;

    combinedStats.healingBonus ? totalStats.healingBonus = combinedStats.healingBonus : null;

    return totalStats;
}