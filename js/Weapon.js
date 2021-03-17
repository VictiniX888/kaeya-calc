import props from '../static/props.json';

export default class Weapon {
    constructor(id, weaponMapping, weaponData, weaponLevelCurve, weaponAscensionData, weaponRefinementData) {
        this.id = id;
        this.name = weaponMapping[this.id].Name;
        this.weaponData = weaponData[this.id];
        this.weaponLevelCurve = weaponLevelCurve;
        this.weaponAscensionData = weaponAscensionData;
        this.weaponRefinementData = weaponRefinementData;

        this.starRank = this.weaponData.RankLevel;
        this.ascensionId = this.weaponData.WeaponPromoteId;
    }

    // Returns an Object containing the weapons's HP, Atk and Def, taking into account only its level and ascension
    getStatsAt(weaponLevel, hasAscended) {
        if (isNaN(weaponLevel) || weaponLevel < 1 || (this.starRank <= 2 && weaponLevel > 70) || weaponLevel > 90) {
            // Return nulls if weapon level is invalid
            return {
                BaseHp: null,
                BaseAtk: null,
                BaseDef: null,
            }
        }
        // If getStatsAt has not been called before, this.level, this.hasAscended, and this.stats will be undefined
        else if (weaponLevel === this.weaponLevel && hasAscended === this.hasAscended) {
            // Don't recalculate stats if it has been calculated with the same parameters before
            return this.stats;
        } else {
            this.level = weaponLevel;
            this.hasAscended = hasAscended;

            let weaponStats = {
                BaseHp: 0,
                BaseAtk: 0,
                BaseDef: 0,
            };

            // Calculate stats from weapon level
            this.weaponData.WeaponProp.forEach(({PropType, InitValue, Type:GrowCurve}) => {
                if (PropType !== undefined) {
                    let multiplier = this.weaponLevelCurve[weaponLevel].find(({Type}) => Type == GrowCurve).Value;
                    weaponStats[props[PropType]] += (InitValue * multiplier);
                }
            });

            // Calculate stats from weapon ascension
            let ascensionLevel;
            // Only 3-star and above weapons can be ascended beyond level 70
            if (this.starRank > 2 && (weaponLevel > 80 || (weaponLevel == 80 && hasAscended))) {
                ascensionLevel = 6;
            } else if (this.starRank > 2 && (weaponLevel > 70 || (weaponLevel == 70 && hasAscended))) {
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

            let ascensionBonuses;
            if (ascensionLevel > 0) {
                ascensionBonuses = this.weaponAscensionData.find(({WeaponPromoteId, PromoteLevel}) => WeaponPromoteId == this.ascensionId && PromoteLevel == ascensionLevel).AddProps;
            }
            
            if (ascensionBonuses !== undefined) {
                ascensionBonuses.forEach(({PropType, Value}) => {
                    if (Value !== undefined) {
                        weaponStats[props[PropType]] += Value;
                    }
                });
            }

            this.stats = weaponStats;

            return weaponStats;
        }
    }
}