import {
  getCharacterData as getData,
  getCharacterAscensionBonusData as getAscensionBonusData,
  getCharacterStatCurveAt as getStatCurveAt,
  getAscensionBonusAt,
  getTalentData,
  getTalentStatsAt,
} from './Data.js';

import { getTalentFn } from './talent';
import { getOptions } from './option';

import type {
  AscensionBonus,
  StatCurveMapping,
  Stats,
  TalentDataSet,
} from '../data/types';
import type DamageModifier from './modifier/DamageModifer.js';
import type { TalentType } from './talent/types.js';

export default class Character {
  id: string;
  name: string;
  baseStats: Stats;
  statCurveMapping: StatCurveMapping;
  ascensionBonuses: AscensionBonus[];
  talents: TalentDataSet;

  innateStats?: Stats;
  level?: number;
  hasAscended?: boolean;

  constructor(id: string) {
    this.id = id;

    const data = getData(id);
    this.name = data.name;
    this.baseStats = data.baseStats;
    this.statCurveMapping = data.statCurves;
    this.ascensionBonuses = getAscensionBonusData(id);

    this.talents = getTalentData(id);
  }

  // Returns an Object containing the character's innate total HP, Atk and Def, taking into account only their level and ascension
  getInnateStatsAt(level: number, hasAscended: boolean) {
    if (isNaN(level) || level < 1 || level > 90) {
      // Return nulls if level is invalid
      let innateStats;
      if (this.innateStats !== undefined) {
        // Copy all of innateStats' properties to a new object and initialize them to null
        innateStats = Object.keys(this.innateStats).reduce((obj, stat) => {
          obj[stat] = NaN;
          return obj;
        }, {} as Stats);
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
  getTalentDamageAt({
    type,
    talentLevel,
    totalStats,
    modifier,
  }: {
    type: TalentType;
    talentLevel: number;
    totalStats: Stats;
    modifier: DamageModifier;
  }) {
    const params = getTalentStatsAt(type, talentLevel, this.talents);

    let damageFn = getTalentFn(this.id, type);

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
