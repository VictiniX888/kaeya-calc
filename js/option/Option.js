export default class Option {
  // Currently handled types: boolean
  constructor({
    id,
    type,
    value,

    // Applies the Option onto stats
    // Mutates stats directly
    applyOnStats = (stats, value) => {
      return stats;
    },

    // Applies the Option onto modifier
    // Mutates modifier directly
    applyOnModifier = (modifier, value) => {
      return modifier;
    },
  }) {
    this.id = id;
    this.type = type;
    this.value = value;
    this._applyOnStats = applyOnStats;
    this._applyOnModifier = applyOnModifier;
  }

  applyOnStats(stats) {
    return this._applyOnStats(stats, this.value);
  }

  applyOnModifier(modifier) {
    return this._applyOnModifier(modifier, this.value);
  }

  // Returns a new Option with the new value
  withValue(value) {
    return new Option({
      id: this.id,
      type: this.type,
      value,
      applyOnStats: this._applyOnStats,
      applyOnModifier: this._applyOnModifier,
    });
  }
}
