import Option from '../Option.js';

export default class ArtifactSetOption extends Option {
  constructor({
    id,
    type,
    initialValue,
    threshold,

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
    super({ id, type, initialValue, applyOnStats, applyOnModifier });
    this.threshold = threshold;
  }

  applyOnStats(stats) {
    this._applyOnStats(stats, this.value);
    return stats;
  }
}
