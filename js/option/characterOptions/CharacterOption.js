import Option from '../Option';

export default class CharacterOption extends Option {
  constructor({
    id,
    type,
    initialValue,
    choices = [],

    // Applies the Option onto stats
    // Mutates stats directly
    applyOnStats = (
      stats,
      value,
      { talentAttackLevel, talentSkillLevel, talentBurstLevel }
    ) => {},

    // Applies the Option onto modifier
    // Mutates modifier directly
    applyOnModifier = (modifier, value) => {},
  }) {
    super({ id, type, initialValue, choices, applyOnStats, applyOnModifier });
  }

  applyOnStats(stats, talentAttackLevel, talentSkillLevel, talentBurstLevel) {
    this._applyOnStats(stats, this.value, {
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
    });
    return stats;
  }
}
