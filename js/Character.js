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

        this.characterData.PropGrowCurves.forEach(({Type, GrowCurve}) => {
            if (Type == 'FIGHT_PROP_BASE_HP') {
                this.hpGrowthCurve = GrowCurve;
            } else if (Type == 'FIGHT_PROP_BASE_ATTACK') {
                this.atkGrowthCurve = GrowCurve;
            } else if (Type == 'FIGHT_PROP_BASE_DEFENSE') {
                this.defGrowthCurve = GrowCurve;
            }
        });

        this.ascensionId = this.characterData.AvatarPromoteId;
    }

    // Returns an Object containing the character's innate total HP, Atk and Def, taking into account only their level and ascension
    getStatsAt(level, hasAscended) {
        let hpMultiplier = this.characterLevelCurve[level].find(({Type}) => Type == this.hpGrowthCurve).Value;
        let atkMultiplier = this.characterLevelCurve[level].find(({Type}) => Type == this.atkGrowthCurve).Value;
        let defMultiplier = this.characterLevelCurve[level].find(({Type}) => Type == this.defGrowthCurve).Value;

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

        let ascensionHp, ascensionAtk, ascensionDef;
        if (ascensionBonuses !== undefined) {
            ascensionBonuses.forEach(({PropType, Value}) => {
                if (PropType == 'FIGHT_PROP_BASE_HP') {
                    ascensionHp = Value;
                } else if (PropType == 'FIGHT_PROP_BASE_ATTACK') {
                    ascensionAtk = Value;
                } else if (PropType == 'FIGHT_PROP_BASE_DEFENSE') {
                    ascensionDef = Value;
                }
            });
        } else {
            ascensionHp = 0;
            ascensionAtk = 0;
            ascensionDef = 0;
        }

        let totalHp = this.baseHp * hpMultiplier + ascensionHp;
        let totalAtk = this.baseAtk * atkMultiplier + ascensionAtk;
        let totalDef = this.baseDef * defMultiplier + ascensionDef;
        
        return {
            Hp: totalHp,
            Attack: totalAtk,
            Defense: totalDef,
        }
    }
}