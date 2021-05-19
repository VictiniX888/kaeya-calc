export default class DamageModifier {
    constructor({
        characterLevel,
        enemyLevel = 1,
        enemyRes = {},
        modifiers = {},
        critType = 'none',
        flatDmg = 0,
        reaction = 'none',
        talentAttackLevel,
        talentSkillLevel,
        talentBurstLevel,
        talentOptions = [],
    }) {
        this.characterLevel = characterLevel;
        this.enemyLevel = enemyLevel;
        this.enemyRes = enemyRes;
        this.modifiers = modifiers;
        this.critType = critType;
        this.flatDmg = flatDmg;
        this.reaction = reaction;
        this.talentAttackLevel = talentAttackLevel;
        this.talentSkillLevel = talentSkillLevel;
        this.talentBurstLevel = talentBurstLevel;

        talentOptions.forEach(({id, value}) => {
            this[id] = value;
        });
    }
}