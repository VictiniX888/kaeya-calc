export default class Character {
    constructor(name, characterMapping, characterData, characterLevelCurve, ascensionData) {
        this.name = name;
        this.id = characterMapping[this.name].Id;
        this.characterData = characterData[this.id];
        this.characterLevelCurve = characterLevelCurve;
        this.ascensionData = ascensionData;
    }

    getAtkAt(level, hasAscended) {
        const baseAtk = this.characterData.AttackBase;
        const growthCurve = this.characterData.PropGrowCurves.find(({Type}) => Type == 'FIGHT_PROP_BASE_ATTACK').GrowCurve;
        const atkMultiplier = this.characterLevelCurve[level].find(({Type}) => Type == growthCurve).Value;

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
        const ascensionId = this.characterData.AvatarPromoteId;

        const ascensionBonuses = (ascensionLevel > 0) ? this.ascensionData.find(({AvatarPromoteId, PromoteLevel}) => AvatarPromoteId == ascensionId && PromoteLevel == ascensionLevel).AddProps : undefined;
        const ascensionAtk = ascensionBonuses ? ascensionBonuses.find(({PropType}) => PropType == 'FIGHT_PROP_BASE_ATTACK').Value : 0;

        const totalAtk = baseAtk * atkMultiplier + ascensionAtk;
        return totalAtk;
    }
}