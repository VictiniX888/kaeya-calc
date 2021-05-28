import Option from '../Option.js';

export default class ArtifactSetOption extends Option {
  constructor({
    id,
    type,
    initialValue,
    threshold,

    // Applies the Option onto stats
    // Mutates stats directly
    applyOnStats = (stats, value) => {},

    // Applies the Option onto modifier
    // Mutates modifier directly
    applyOnModifier = (modifier, value) => {},
  }) {
    super({ id, type, initialValue, applyOnStats, applyOnModifier });
    this.threshold = threshold;
  }

  // Returns a new Option with the new value
  withValue(value) {
    return new this.constructor({
      id: this.id,
      type: this.type,
      initialValue: value,
      threshold: this.threshold,
      applyOnStats: this._applyOnStats,
      applyOnModifier: this._applyOnModifier,
    });
  }
}
