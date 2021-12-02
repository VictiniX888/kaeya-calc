import {
  getCharacterData as getData,
  getCharacterAscensionBonusData as getAscensionBonusData,
  getCharacterStatCurveAt as getStatCurveAt,
  getAscensionBonusAt,
  getTalentData,
} from '../data/Data';

import type {
  AscensionBonus,
  StatCurveMapping,
  Stats,
  TalentDataSet,
} from '../data/types';
import type { Talents } from '../talent/types';
import CharacterOption from '../option/characterOptions/CharacterOption';
import { CharacterPassive, TeamPassive } from '../passive/types';
import { ModifierMixin, StatMixin } from '../option/Mixin';
import Constellation from '../constellation/Constellation';

export default class Character {
  constructor(
    id: string,
    level: number = 1,
    hasAscended: boolean = false,
    constellationLevel = 0
  ) {
    this._level = level;
    this._hasAscended = hasAscended;
    this._constellationLevel = constellationLevel;

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

    this.innateStats = this.getInnateStatsAt(this.level, this.hasAscended);
    this.characterOptions = this.getCharacterOptions();
    const ascensionLevel = getAscensionLevel(this.level, this.hasAscended);
    this.passives = this.getPassives(ascensionLevel);
    this.passiveOptions = this.getPassiveOptions(ascensionLevel);
    this.constellations = this.getConstellations(this.constellationLevel);
    this.constellationOptions = this.getConstellationsOptions(
      this.constellationLevel
    );
    this.teamOptions = this.getTeamOptions();

    this.talents = getTalentData(value);
    this.talentFns = this.getAllTalentFns();
  }

  name?: string;
  baseStats?: Stats;
  statCurveMapping?: StatCurveMapping;
  ascensionBonuses?: AscensionBonus[];
  talents?: TalentDataSet;
  talentFns: Talents = {};

  private _level: number = 1;
  get level(): number {
    return this._level;
  }
  set level(value: number) {
    const prevAscensionLevel = getAscensionLevel(this.level, this.hasAscended);
    this._level = value;
    const ascensionLevel = getAscensionLevel(this.level, this.hasAscended);

    this.talentFns = this.getAllTalentFns();

    this.innateStats = this.getInnateStatsAt(value, this.hasAscended);
    this.passives = this.getPassives(ascensionLevel);
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

    this.talentFns = this.getAllTalentFns();

    this.innateStats = this.getInnateStatsAt(this.level, value);
    this.passives = this.getPassives(ascensionLevel);
    this.passiveOptions = this.getPassiveOptions(
      ascensionLevel,
      prevAscensionLevel
    );
  }

  private _constellationLevel: number = 0;
  get constellationLevel(): number {
    return this._constellationLevel;
  }
  set constellationLevel(value: number) {
    const prevConstellationLevel = this.constellationLevel;
    this._constellationLevel = value;

    this.constellations = this.getConstellations(value);
    this.constellationOptions = this.getConstellationsOptions(
      value,
      prevConstellationLevel
    );
  }

  innateStats: Stats = {};
  passives: CharacterPassive[] = [];
  constellations: Constellation[] = [];

  characterOptions: CharacterOption[] = [];
  passiveOptions: CharacterOption[] = [];
  constellationOptions: CharacterOption[] = [];
  teamOptions: CharacterOption[] = [];

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

  // Override in derived classes
  getTalentFns(): Talents {
    return {};
  }

  getAllTalentFns(): Talents {
    return {
      ...this.getTalentFns(),
      ...this.getPassiveTalentFns(),
    };
  }

  // Override in derived classes if character has base options
  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return [];
  }

  getCharacterOptions(): CharacterOption[] {
    return this.getCharacterOptionConstuctors().map((Option) => new Option());
  }

  // Override in derived classes
  getAllPassives(): CharacterPassive[] {
    return [];
  }

  // Returns passives that character should have based on their current ascension
  getPassives(ascensionLevel: number): CharacterPassive[] {
    return this.getAllPassives().filter(
      (passive) => ascensionLevel >= passive.ascensionLevel
    );
  }

  // getPassives should be called before this if passives are updated
  getPassiveOptions(
    ascensionLevel: number,
    prevAscensionLevel?: number
  ): CharacterOption[] {
    if (prevAscensionLevel === undefined || isNaN(prevAscensionLevel)) {
      return this.passives
        .flatMap(({ options }) => options)
        .map((Option) => new Option());
    }

    if (ascensionLevel > prevAscensionLevel) {
      const oldOptionIds = this.passiveOptions.map(({ id }) => id);
      const newOptions = this.passives
        .flatMap(({ options }) => options)
        .map((Option) => new Option())
        .filter(({ id }) => !oldOptionIds.includes(id));

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

  getPassiveTalentFns(): Talents {
    return this.passives.reduce((acc, { talents }) => {
      return { ...acc, ...(talents ?? {}) };
    }, {} as Talents);
  }

  // Override in derived classes
  getAllConstellations(): Constellation[] {
    return [];
  }

  getConstellations(constellationLevel: number): Constellation[] {
    return this.getAllConstellations().filter(
      (constellation) => constellationLevel >= constellation.constellationLevel
    );
  }

  // getConstellations should be called before this if passives are updated
  getConstellationsOptions(
    constellationLevel: number,
    prevConstellationLevel?: number
  ): CharacterOption[] {
    if (prevConstellationLevel === undefined || isNaN(prevConstellationLevel)) {
      return this.constellations
        .flatMap(({ options }) => options ?? [])
        .map((Option) => new Option());
    }

    if (constellationLevel > prevConstellationLevel) {
      const newOptions = this.constellations
        .filter(
          ({ constellationLevel }) =>
            constellationLevel > prevConstellationLevel
        )
        .flatMap(({ options }) => options ?? [])
        .map((Option) => new Option());

      return this.constellationOptions.concat(newOptions);
    }

    if (constellationLevel < prevConstellationLevel) {
      const keptOptionIds = this.constellations
        .flatMap(({ options }) => options ?? [])
        .map((Option) => new Option())
        .map((option) => option.id);

      return this.constellationOptions.filter((option) =>
        keptOptionIds.includes(option.id)
      );
    }

    // if (constellationLevel === prevConstellationLevel)
    return this.constellationOptions;
  }

  getConstellationStatMixins(): StatMixin[] {
    return this.constellations
      .map(({ statMixin }) => statMixin)
      .filter((mixin): mixin is StatMixin => mixin !== undefined);
  }

  getConstellationModifierMixins(): ModifierMixin[] {
    return this.constellations
      .map(({ modifierMixin }) => modifierMixin)
      .filter((mixin): mixin is ModifierMixin => mixin !== undefined);
  }

  getOptions() {
    const characterOptions = this.characterOptions;
    const passiveOptions = this.passiveOptions;
    const constellationOptions = this.constellationOptions;

    return [...characterOptions, ...passiveOptions, ...constellationOptions];
  }

  // Override in derived classes to implement team buffs
  getTeamPassive(): TeamPassive | undefined {
    return undefined;
  }

  getTeamStatMixin(): StatMixin | undefined {
    return this.getTeamPassive()?.statMixin;
  }

  getTeamModifierMixin(): ModifierMixin | undefined {
    return this.getTeamPassive()?.modifierMixin;
  }

  getTeamOptions(): CharacterOption[] {
    const teamPassive = this.getTeamPassive();

    return (
      teamPassive?.options?.flatMap((Option) => new Option().unroll()) ?? []
    );
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
