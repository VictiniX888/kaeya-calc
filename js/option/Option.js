export default class Option {
  // Currently handled types: boolean
  constructor({
    id,
    type,
    initialValue,

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
    this.id = id;
    this.type = type;
    this.value = initialValue;
    this._applyOnStats = applyOnStats;
    this._applyOnModifier = applyOnModifier;
  }

  applyOnStats(stats, talentAttackLevel, talentSkillLevel, talentBurstLevel) {
    this._applyOnStats(stats, this.value, {
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
    });
    return stats;
  }

  applyOnModifier(modifier) {
    this._applyOnModifier(modifier, this.value);
    return modifier;
  }

  // Returns a new Option (or child class) with the new value
  withValue(value) {
    return new this.constructor({
      id: this.id,
      type: this.type,
      initialValue: value,
      applyOnStats: this._applyOnStats,
      applyOnModifier: this._applyOnModifier,
    });
  }
}
