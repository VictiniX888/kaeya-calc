import {
  getCharacterData as getData,
  getCharacterAscensionBonusData as getAscensionBonusData,
  getCharacterStatCurveAt as getStatCurveAt,
  getAscensionBonusAt,
  getTalentData,
  getTalentStatsAt,
} from '../Data';

import { getTalentFn } from '../talent';
import { getCharacterOptions } from '../option';

import type {
  AscensionBonus,
  StatCurveMapping,
  Stats,
  TalentDataSet,
} from '../../data/types';
import type DamageModifier from '../modifier/DamageModifer';
import type { TalentType } from '../talent/types';
import { getCharacterPassiveFn } from '../passive/characterPassives/CharacterPassive';
import { CharacterOption } from '../option/characterOptions';
import { CharacterPassive } from '../passive/types';
import { ModifierMixin, StatMixin } from '../option/Mixin';

export default class Character {
  constructor(id: string, level: number, hasAscended: boolean) {
    this._level = level;
    this._hasAscended = hasAscended;

    this.id = id;
  }

  private _id: string = '';
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    // Essentially replaces the constructor
    this._id = value;

    const data = getData(value);

    this.name = data?.name;
    this.baseStats = data?.baseStats;
    this.statCurveMapping = data?.statCurves;
    this.ascensionBonuses = getAscensionBonusData(value);

    this.talents = getTalentData(value);

    this.innateStats = this.getInnateStatsAt(this.level, this.hasAscended);
    this.characterOptions = this.getCharacterOptions();
    const ascensionLevel = getAscensionLevel(this.level, this.hasAscended);
    this.passives = this.getPassives(ascensionLevel);
    this.passiveOptions = this.getPassiveOptions(ascensionLevel);
  }

  name?: string;
  baseStats?: Stats;
  statCurveMapping?: StatCurveMapping;
  ascensionBonuses?: AscensionBonus[];
  talents?: TalentDataSet;

  private _level: number = 1;
  get level(): number {
    return this._level;
  }
  set level(value: number) {
    const prevAscensionLevel = getAscensionLevel(this.level, this.hasAscended);
    this._level = value;
    const ascensionLevel = getAscensionLevel(this.level, this.hasAscended);

    this.innateStats = this.getInnateStatsAt(value, this.hasAscended);
    this.passives = this.getPassives(ascensionLevel, prevAscensionLevel);
    this.passiveOptions = this.getPassiveOptions(
      ascensionLevel,
      prevAscensionLevel
    );
  }

  private _hasAscended: boolean = false;
  get hasAscended() {
    return this._hasAscended;
  }
  set hasAscended(value: boolean) {
    const prevAscensionLevel = getAscensionLevel(this.level, this.hasAscended);
    this._hasAscended = value;
    const ascensionLevel = getAscensionLevel(this.level, this.hasAscended);

    this.innateStats = this.getInnateStatsAt(this.level, value);
    this.passives = this.getPassives(ascensionLevel, prevAscensionLevel);
    this.passiveOptions = this.getPassiveOptions(
      ascensionLevel,
      prevAscensionLevel
    );
  }

  innateStats: Stats = {};
  passives: CharacterPassive[] = [];
  characterOptions: CharacterOption[] = [];
  passiveOptions: CharacterOption[] = [];

  isDefined() {
    return this.id !== '';
  }

  // Returns an Object containing the character's innate total HP, Atk and Def, taking into account only their level and ascension
  getInnateStatsAt(level: number, hasAscended: boolean) {
    if (
      this.baseStats === undefined ||
      this.statCurveMapping === undefined ||
      this.ascensionBonuses === undefined
    ) {
      // Character is (likely) not defined/stats not found
      return {};
    }

    if (isNaN(level) || level < 1 || level > 90) {
      // Return NaNs if level is invalid
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

      return innateStats;
    }

    // ELSE
    // Initialize stats with character level 1 base stats
    let innateStats = { ...this.baseStats };

    let charStatCurves = getStatCurveAt(level);

    // Calculate stats from character level
    Object.entries(this.statCurveMapping).forEach(([stat, curve]) => {
      let multiplier = charStatCurves[curve];
      innateStats[stat] *= multiplier;
    });

    // Calculate stats from character ascension
    let ascensionLevel = getAscensionLevel(level, hasAscended);

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

    return innateStats;
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
    if (this.talents === undefined) {
      return [];
    }

    const params = getTalentStatsAt(type, talentLevel, this.talents);

    let damageFn = getTalentFn(this.id, type);

    let damage = damageFn({
      params,
      stats: totalStats,
      modifier,
    });

    return damage;
  }

  getCharacterOptions() {
    return getCharacterOptions(this.id).map((Option) => new Option());
  }

  getPassives(ascensionLevel: number, prevAscensionLevel?: number) {
    if (this.talents === undefined) {
      return [];
    }

    const passiveDatas = this.talents.passives;

    if (prevAscensionLevel === undefined || isNaN(prevAscensionLevel)) {
      return passiveDatas
        .filter((passiveData) => ascensionLevel >= passiveData.ascensionLevel)
        .flatMap((passiveData) =>
          getCharacterPassiveFn(passiveData.id)(passiveData.params)
        );
    }

    if (ascensionLevel > prevAscensionLevel) {
      const newPassives = passiveDatas
        .filter(
          (passiveData) =>
            ascensionLevel >= passiveData.ascensionLevel &&
            passiveData.ascensionLevel > prevAscensionLevel
        )
        .flatMap((passiveData) =>
          getCharacterPassiveFn(passiveData.id)(passiveData.params)
        );

      return this.passives.concat(newPassives);
    }

    if (ascensionLevel < prevAscensionLevel) {
      const keptPassiveIds = passiveDatas
        .filter((passiveData) => ascensionLevel >= passiveData.ascensionLevel)
        .flatMap(
          (passiveData) =>
            getCharacterPassiveFn(passiveData.id)(passiveData.params).id
        );

      return this.passives.filter((option) =>
        keptPassiveIds.includes(option.id)
      );
    }

    // if (ascensionLevel === prevAscensionLevel)
    return this.passives;
  }

  // getPassives should be called before this if passives are updated
  getPassiveOptions(ascensionLevel: number, prevAscensionLevel?: number) {
    if (prevAscensionLevel === undefined || isNaN(prevAscensionLevel)) {
      return this.passives
        .flatMap(({ options }) => options)
        .map((Option) => new Option());
    }

    if (ascensionLevel > prevAscensionLevel) {
      const newOptions = this.passives
        .flatMap(({ options }) => options)
        .map((Option) => new Option());

      return this.passiveOptions.concat(newOptions);
    }

    if (ascensionLevel < prevAscensionLevel) {
      const keptOptionIds = this.passives
        .flatMap(({ options }) => options)
        .map((Option) => new Option())
        .map((option) => option.id);

      return this.passiveOptions.filter((option) =>
        keptOptionIds.includes(option.id)
      );
    }

    // if (ascensionLevel === prevAscensionLevel)
    return this.passiveOptions;
  }

  getOptions() {
    const characterOptions = this.characterOptions;
    const passiveOptions = this.passiveOptions;

    return characterOptions.concat(passiveOptions);
  }

  getPassiveStatMixins(): StatMixin[] {
    return this.passives
      .map(({ statMixin }) => statMixin)
      .filter((mixin): mixin is StatMixin => mixin !== undefined);
  }

  getPassiveModifierMixins(): ModifierMixin[] {
    return this.passives
      .map(({ modifierMixin }) => modifierMixin)
      .filter((mixin): mixin is ModifierMixin => mixin !== undefined);
  }
}

// Utility functions
export function getAscensionLevel(level: number, hasAscended: boolean) {
  let ascensionLevel;
  if (level > 80 || (level === 80 && hasAscended)) {
    ascensionLevel = 6;
  } else if (level > 70 || (level === 70 && hasAscended)) {
    ascensionLevel = 5;
  } else if (level > 60 || (level === 60 && hasAscended)) {
    ascensionLevel = 4;
  } else if (level > 50 || (level === 50 && hasAscended)) {
    ascensionLevel = 3;
  } else if (level > 40 || (level === 40 && hasAscended)) {
    ascensionLevel = 2;
  } else if (level > 20 || (level === 20 && hasAscended)) {
    ascensionLevel = 1;
  } else {
    ascensionLevel = 0;
  }

  return ascensionLevel;
}
