import { getWeaponData as getData, getWeaponAscensionBonusData as getAscensionBonusData, getWeaponStatCurveAt as getStatCurveAt, getAscensionBonusAt } from './Data.js';

export default class Weapon {
    constructor(id) {
        this.id = id;

        const data = getData(id);
        this.name = data.name;
        this.type = data.type;
        this.rank = data.rank;
        this.baseStats = data.baseStats;
        this.statCurveMapping = data.statCurves;
        this.ascensionBonuses = getAscensionBonusData(id);
    }

    // Returns an Object containing the weapons's HP, Atk and Def, taking into account only its level and ascension
    getStatsAt(weaponLevel, hasAscended) {
        if (isNaN(weaponLevel) || weaponLevel < 1 || (this.rank <= 2 && weaponLevel > 70) || weaponLevel > 90) {
            // Return nulls if weapon level is invalid
            let weaponStats;
            if (this.stats !== undefined) {
                // Copy all of stats' properties to a new object and initialize them to null
                weaponStats = Object.keys(this.stats).reduce((obj, stat) => {
                    obj[stat] = null;
                    return obj;
                }, {});
            } else {
                weaponStats = {};
            }
            
            this.stats = weaponStats;
            this.weaponLevel = weaponLevel;
            this.hasAscended = hasAscended;

            return weaponStats;
        }
        // If getStatsAt has not been called before, this.weaponLevel, this.hasAscended, and this.stats will be undefined
        else if (weaponLevel === this.weaponLevel && hasAscended === this.hasAscended) {
            // Don't recalculate stats if it has been calculated with the same parameters before
            return this.stats;
        } else {

            // Level 1 weapon stats
            let weaponStats = {...this.baseStats};

            let weaponStatCurves = getStatCurveAt(weaponLevel);

            // Calculate stats from weapon level
            Object.entries(this.statCurveMapping).forEach(([stat, curve]) => {
                let multiplier = weaponStatCurves[curve];
                weaponStats[stat] *= multiplier;
            });

            // Calculate stats from weapon ascension
            let ascensionLevel;
            // Only 3-star and above weapons can be ascended beyond level 70
            if (this.rank > 2 && (weaponLevel > 80 || (weaponLevel == 80 && hasAscended))) {
                ascensionLevel = 6;
            } else if (this.rank > 2 && (weaponLevel > 70 || (weaponLevel == 70 && hasAscended))) {
                ascensionLevel = 5;
            } else if (weaponLevel > 60 || (weaponLevel == 60 && hasAscended)) {
                ascensionLevel = 4;
            } else if (weaponLevel > 50 || (weaponLevel == 50 && hasAscended)) {
                ascensionLevel = 3;
            } else if (weaponLevel > 40 || (weaponLevel == 40 && hasAscended)) {
                ascensionLevel = 2;
            } else if (weaponLevel > 20 || (weaponLevel == 20 && hasAscended)) {
                ascensionLevel = 1;
            } else {
                ascensionLevel = 0;
            }
            let ascensionBonuses = getAscensionBonusAt(ascensionLevel, this.ascensionBonuses);
            
            if (ascensionBonuses !== undefined) {
                Object.entries(ascensionBonuses).forEach(([stat, bonus]) => {
                    if (stat in weaponStats) {
                        weaponStats[stat] += bonus;
                    } else {
                        weaponStats[stat] = bonus;
                    }
                })
            }

            this.stats = weaponStats;
            this.weaponLevel = weaponLevel;
            this.hasAscended = hasAscended;

            return weaponStats;
        }
    }
}
