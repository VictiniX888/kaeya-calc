import {
  getCharacterData as getData,
  getCharacterAscensionBonusData as getAscensionBonusData,
  getCharacterStatCurveAt as getStatCurveAt,
  getAscensionBonusAt,
  getTalentData,
  getTalentStatsAt,
} from './Data.js';

import * as talents from './Talent.js';
import { getOptions } from './option';

export default class Character {
  constructor(id) {
    this.id = id;

    const data = getData(id);
    this.name = data.name;
    this.baseStats = data.baseStats;
    this.statCurveMapping = data.statCurves;
    this.ascensionBonuses = getAscensionBonusData(id);

    this.talents = getTalentData(id);
  }

  // Returns an Object containing the character's innate total HP, Atk and Def, taking into account only their level and ascension
  getInnateStatsAt(level, hasAscended) {
    if (isNaN(level) || level < 1 || level > 90) {
      // Return nulls if level is invalid
      let innateStats;
      if (this.innateStats !== undefined) {
        // Copy all of innateStats' properties to a new object and initialize them to null
        innateStats = Object.keys(this.innateStats).reduce((obj, stat) => {
          obj[stat] = null;
          return obj;
        }, {});
      } else {
        innateStats = {};
      }

      this.innateStats = innateStats;
      this.level = level;
      this.hasAscended = hasAscended;

      return innateStats;
    }
    // If getStatsAt has not been called before, this.level, this.hasAscended, and this.stats will be undefined
    else if (level === this.level && hasAscended === this.hasAscended) {
      // Don't recalculate stats if it has been calculated with the same parameters before
      return this.innateStats;
    } else {
      // Initialize stats with character level 1 base stats
      let innateStats = { ...this.baseStats };

      let charStatCurves = getStatCurveAt(level);

      // Calculate stats from character level
      Object.entries(this.statCurveMapping).forEach(([stat, curve]) => {
        let multiplier = charStatCurves[curve];
        innateStats[stat] *= multiplier;
      });

      // Calculate stats from character ascension
      let ascensionLevel;
      if (level > 80 || (level == 80 && hasAscended)) {
        ascensionLevel = 6;
      } else if (level > 70 || (level == 70 && hasAscended)) {
        ascensionLevel = 5;
      } else if (level > 60 || (level == 60 && hasAscended)) {
        ascensionLevel = 4;
      } else if (level > 50 || (level == 50 && hasAscended)) {
        ascensionLevel = 3;
      } else if (level > 40 || (level == 40 && hasAscended)) {
        ascensionLevel = 2;
      } else if (level > 20 || (level == 20 && hasAscended)) {
        ascensionLevel = 1;
      } else {
        ascensionLevel = 0;
      }
      let ascensionBonuses = getAscensionBonusAt(
        ascensionLevel,
        this.ascensionBonuses
      );

      if (ascensionBonuses !== undefined) {
        Object.entries(ascensionBonuses).forEach(([stat, bonus]) => {
          if (stat in innateStats) {
            innateStats[stat] += bonus;
          } else {
            innateStats[stat] = bonus;
          }
        });
      }

      this.innateStats = innateStats;
      this.level = level;
      this.hasAscended = hasAscended;

      return innateStats;
    }
  }

  // Return an Object with description and damage properties
  getTalentDamageAt({ type, talentLevel, totalStats, modifier }) {
    const params = getTalentStatsAt(
      type.toLowerCase(),
      talentLevel,
      this.talents
    );

    let damageFn = talents[this.id + type];
    if (damageFn === undefined) {
      damageFn = talents['defaultTalent'];
    }

    let damage = damageFn({
      params,
      stats: totalStats,
      modifier,
    });

    return damage;
  }

  getOptions() {
    return getOptions('character', this.id);
  }
}
