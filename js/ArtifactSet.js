import { getArtifactSetData, getArtifactSetBonusData } from './Data.js';
import * as extraBonuses from './ArtifactSetBonus.js';
import { getOptions } from './option/';

export default class ArtifactSet {
  constructor(id) {
    this.id = id;

    const data = getArtifactSetData(id);
    this.name = data.name;
    this.bonusThresholds = data.bonusThresholds;

    this.setBonuses = getArtifactSetBonusData(id);
  }

  getSetBonusesAt(pieces) {
    return this.bonusThresholds
      .filter((threshold) => pieces >= threshold)
      .map((threshold) => this.setBonuses[threshold]);
  }

  getStatsAt(pieces) {
    let stats = {};

    let setBonuses = this.getSetBonusesAt(pieces);
    setBonuses.forEach((setBonus) => {
      // Normal stat bonuses
      setBonus.bonuses.forEach((statBonus) => {
        if (stats[statBonus.stat] !== undefined) {
          stats[statBonus.stat] += statBonus.value;
        } else {
          stats[statBonus.stat] = statBonus.value;
        }
      });

      // Special bonuses, has to be handled individually
      let extraBonus = setBonus.bonusExtra;
      if (extraBonus.type !== '') {
        let bonusFn = extraBonuses[extraBonus.type];
        if (bonusFn === undefined) {
          bonusFn = extraBonuses['defaultSetBonus'];
        }

        let params = extraBonus.params;

        let statBonuses = bonusFn(params);

        statBonuses.forEach((statBonus) => {
          if (stats[statBonus.stat] !== undefined) {
            stats[statBonus.stat] += statBonus.value;
          } else {
            stats[statBonus.stat] = statBonus.value;
          }
        });
      }
    });

    return stats;
  }

  getOptions(pieces) {
    const options = getOptions('artifactSet', this.id);
    return options.filter(({ threshold }) => pieces >= threshold);
  }
}
