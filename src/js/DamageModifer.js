import Resistance from './Resistance';

export default class DamageModifier {
  constructor({
    characterLevel,
    enemyLevel = 1,
    enemyDefReduction = 0,
    enemyRes = new Resistance({}),
    enemyResReduction = new Resistance({}),
    modifiers = {},
    critType = 'none',
    flatDmg = 0,
    reaction = 'none',
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    options = [],
  }) {
    this.characterLevel = characterLevel;
    this.enemyLevel = enemyLevel;
    this.enemyDefReduction = enemyDefReduction;
    this.enemyRes = enemyRes;
    this.enemyResReduction = enemyResReduction;
    this.modifiers = modifiers;
    this.critType = critType;
    this.flatDmg = flatDmg;
    this.reaction = reaction;
    this.talentAttackLevel = talentAttackLevel;
    this.talentSkillLevel = talentSkillLevel;
    this.talentBurstLevel = talentBurstLevel;

    options.forEach((option) => {
      option.applyOnModifier(this);
    });
  }
}
