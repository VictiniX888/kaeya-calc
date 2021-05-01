export default class DamageModifier {
    constructor({ characterLevel, enemyLevel = 1, enemyRes = {}, modifiers = {}, critType = 'none', flatDmg = 0, reaction = 'none', talentOptions = [] }) {
        this.characterLevel = characterLevel;
        this.enemyLevel = enemyLevel;
        this.enemyRes = enemyRes;
        this.modifiers = modifiers;
        this.critType = critType;
        this.flatDmg = flatDmg;
        this.reaction = reaction;

        talentOptions.forEach(({id, value, isActivated}) => {
            if (isActivated) {
                this[id] = value;
            }
        });
    }
}