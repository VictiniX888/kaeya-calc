export default class DamageModifier {
    constructor({ characterLevel, enemyLevel = 1, enemyRes = {}, modifiers = {}, critType = 'none', flatDmg = 0, reaction = 'none' }) {
        this.characterLevel = characterLevel;
        this.enemyLevel = enemyLevel;
        this.enemyRes = enemyRes;
        this.modifiers = modifiers;
        this.critType = critType;
        this.flatDmg = flatDmg;
        this.reaction = reaction;
    }
}