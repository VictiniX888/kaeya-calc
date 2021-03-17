import props from '../static/props.json';

export default class Character {
    constructor(id, characterMapping, characterData, characterLevelCurve, ascensionData) {
        this.id = id;
        this.name = characterMapping[this.id].Name;
        this.characterData = characterData[this.id];
        this.characterLevelCurve = characterLevelCurve;
        this.ascensionData = ascensionData;

        this.baseHp = this.characterData.HpBase;
        this.baseAtk = this.characterData.AttackBase;
        this.baseDef = this.characterData.DefenseBase;

        this.ascensionId = this.characterData.AvatarPromoteId;
    }

    getStatsWithWeaponAt(weapon, weaponLevel, weaponHasAscended, characterLevel, characterHasAscended) {
        let weaponStats;
        if (weapon !== undefined) {
            weaponStats = weapon.getStatsAt(weaponLevel, weaponHasAscended);
        } else {
            weaponStats = {
                BaseHp: null,
                BaseAtk: null,
                BaseDef: null,
            };
        }

        let innateStats = this.getStatsAt(characterLevel, characterHasAscended);
        
        return {
            InnateHp: innateStats.BaseHp,
            InnateAtk: innateStats.BaseAtk,
            InnateDef: innateStats.BaseDef,
            WeaponHp: weaponStats.BaseHp,
            WeaponAtk: weaponStats.BaseAtk,
            WeaponDef: weaponStats.BaseDef,
        };
    }

    // Returns an Object containing the character's innate total HP, Atk and Def, taking into account only their level and ascension
    getStatsAt(level, hasAscended) {
        if (isNaN(level) || level < 1 || level > 90) {
            // Return nulls if level is invalid
            return {
                BaseHp: null,
                BaseAtk: null,
                BaseDef: null,
            }
        } 
        // If getStatsAt has not been called before, this.level, this.hasAscended, and this.stats will be undefined
        else if (level === this.level && hasAscended === this.hasAscended) {
            // Don't recalculate stats if it has been calculated with the same parameters before
            return this.innateStats;
        } else {
            this.level = level;
            this.hasAscended = hasAscended;

            // Initialize stats with character level 1 base stats
            let innateStats = {
                BaseHp: this.baseHp,
                BaseAtk: this.baseAtk,
                BaseDef: this.baseDef,
            }

            // Calculate stats from character level
            this.characterData.PropGrowCurves.forEach(({Type:PropType, GrowCurve}) => {
                let multiplier = this.characterLevelCurve[level].find(({Type}) => Type == GrowCurve).Value;
                innateStats[props[PropType]] *= multiplier;
            });

            // Calculate stats from character ascension
            let ascensionLevel;
            if (level > 80 || (level == 80 && hasAscended)) {
                ascensionLevel = 6;
            } else if (level > 70 || (level == 70 && hasAscended)) {
                ascensionLevel = 5;
            } else if (level > 60 || (level == 60 && hasAscended)) {
                ascensionLevel = 4;
            } else if (level > 50 || (level == 50 && hasAscended)) {
                ascensionLevel = 3;
            } else if (level > 40 || (level == 40 && hasAscended)) {
                ascensionLevel = 2;
            } else if (level > 20 || (level == 20 && hasAscended)) {
                ascensionLevel = 1;
            } else {
                ascensionLevel = 0;
            }

            let ascensionBonuses;
            if (ascensionLevel > 0) {
                ascensionBonuses = this.ascensionData.find(({AvatarPromoteId, PromoteLevel}) => AvatarPromoteId == this.ascensionId && PromoteLevel == ascensionLevel).AddProps;
            }

            if (ascensionBonuses !== undefined) {
                ascensionBonuses.forEach(({PropType, Value}) => {
                    if (Value !== undefined) {
                        innateStats[props[PropType]] += Value;
                    }
                });
            }

            this.innateStats = innateStats;

            return innateStats;
        }
    }
}