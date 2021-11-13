import {
  AscensionBonus,
  StatCurveMapping,
  Stats,
  WeaponPassiveData,
  WeaponPassiveSetData,
} from '../data/types';
import {
  getWeaponData as getData,
  getWeaponAscensionBonusData as getAscensionBonusData,
  getWeaponStatCurveAt as getStatCurveAt,
  getAscensionBonusAt,
  getWeaponPassiveAt,
  getWeaponPassiveData,
} from '../data/Data';
import { getOptionValue, setOptionValue } from '../option';
import { ModifierMixin, StatMixin } from '../option/Mixin';
import WeaponOption from '../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../passive/types';
import type { WeaponType } from './types';
import { Talents } from '../talent/types';

export default class Weapon {
  constructor(
    id: string,
    level: number = 1,
    hasAscended: boolean = false,
    refinement: number = 1
  ) {
    this._weaponLevel = level;
    this._hasAscended = hasAscended;
    this._refinement = refinement;

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
    this.type = data?.type as WeaponType | undefined;
    this.rank = data?.rank;
    this.baseStats = data?.baseStats;
    this.statCurveMapping = data?.statCurves;
    this.ascensionBonuses = getAscensionBonusData(value);

    this.passiveDataSet = getWeaponPassiveData(value);
    if (this.passiveDataSet !== undefined) {
      this.passiveData = getWeaponPassiveAt(
        this.refinement,
        this.passiveDataSet
      );
    }
    this.passive = this.getPassive(this.refinement);
    this.passiveOptions = this.getPassiveOptions();

    this.stats = this.getStatsAt(this.weaponLevel, this.hasAscended);

    this.talentFns = this.getTalentFns(this.refinement);
  }

  name?: string;
  type?: WeaponType;
  rank?: number;
  baseStats?: Stats;
  statCurveMapping?: StatCurveMapping;
  ascensionBonuses?: AscensionBonus[];
  passiveDataSet?: WeaponPassiveSetData;
  talentFns: Talents = {};

  private _weaponLevel: number = 1;
  get weaponLevel(): number {
    return this._weaponLevel;
  }
  set weaponLevel(value: number) {
    this._weaponLevel = value;
    this.stats = this.getStatsAt(value, this.hasAscended);
  }

  private _hasAscended: boolean = false;
  get hasAscended(): boolean {
    return this._hasAscended;
  }
  set hasAscended(value: boolean) {
    this._hasAscended = value;
    this.stats = this.getStatsAt(this.weaponLevel, value);
  }

  private _refinement: number = 1;
  get refinement(): number {
    return this._refinement;
  }
  set refinement(value: number) {
    this._refinement = value;
    if (this.passiveDataSet !== undefined) {
      this.passiveData = getWeaponPassiveAt(value, this.passiveDataSet);
      this.passive = this.getPassive(value);
      this.passiveOptions = this.getPassiveOptions(true);
    }
  }

  stats: Stats = {};
  passiveData?: WeaponPassiveData;
  passive?: WeaponPassive;
  passiveOptions: WeaponOption[] = [];

  isDefined() {
    return this.id !== '';
  }

  // Returns an Object containing the weapons's HP, Atk and Def, taking into account only its level and ascension
  getStatsAt(weaponLevel: number, hasAscended: boolean) {
    if (
      this.rank === undefined ||
      this.baseStats === undefined ||
      this.statCurveMapping === undefined ||
      this.ascensionBonuses === undefined
    ) {
      // Weapon is (likely) not defined/stats not found
      return {};
    }

    if (
      isNaN(weaponLevel) ||
      weaponLevel < 1 ||
      (this.rank <= 2 && weaponLevel > 70) ||
      weaponLevel > 90
    ) {
      // Return NaNs if weapon level is invalid
      let weaponStats;
      if (this.stats !== undefined) {
        // Copy all of stats' properties to a new object and initialize them to null
        weaponStats = Object.keys(this.stats).reduce((obj, stat) => {
          obj[stat] = NaN;
          return obj;
        }, {} as Stats);
      } else {
        weaponStats = {};
      }

      return weaponStats;
    }

    // ELSE
    // Level 1 weapon stats
    let weaponStats = { ...this.baseStats };

    let weaponStatCurves = getStatCurveAt(weaponLevel);

    // Calculate stats from weapon level
    Object.entries(this.statCurveMapping).forEach(([stat, curve]) => {
      let multiplier = weaponStatCurves[curve];
      weaponStats[stat] *= multiplier;
    });

    // Calculate stats from weapon ascension
    let ascensionLevel;
    // Only 3-star and above weapons can be ascended beyond level 70
    if (
      this.rank > 2 &&
      (weaponLevel > 80 || (weaponLevel === 80 && hasAscended))
    ) {
      ascensionLevel = 6;
    } else if (
      this.rank > 2 &&
      (weaponLevel > 70 || (weaponLevel === 70 && hasAscended))
    ) {
      ascensionLevel = 5;
    } else if (weaponLevel > 60 || (weaponLevel === 60 && hasAscended)) {
      ascensionLevel = 4;
    } else if (weaponLevel > 50 || (weaponLevel === 50 && hasAscended)) {
      ascensionLevel = 3;
    } else if (weaponLevel > 40 || (weaponLevel === 40 && hasAscended)) {
      ascensionLevel = 2;
    } else if (weaponLevel > 20 || (weaponLevel === 20 && hasAscended)) {
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
        if (stat in weaponStats) {
          weaponStats[stat] += bonus;
        } else {
          weaponStats[stat] = bonus;
        }
      });
    }

    return weaponStats;
  }

  // Override in derived classes to implement special passives
  // Only returns the extra passive bonuses, excluding the direct stat bonuses
  // To be called when passive should update (e.g. id or refinement change)
  getPassive(_refinement: number): WeaponPassive | undefined {
    return;
  }

  // getPassive should be called before this if passives are updated
  getPassiveOptions(shouldKeepValue: boolean = false) {
    let newOptions = (this.passive?.options ?? []).map(
      (Option) => new Option()
    );

    if (shouldKeepValue) {
      this.passiveOptions.forEach((option) => {
        let newOption = newOptions.find(
          (newOption) => newOption.id === option.id
        );
        if (newOption !== undefined) {
          setOptionValue(newOption, getOptionValue(option));
        }
      });
    }

    return newOptions;
  }

  getPassiveStatMixins(): StatMixin[] {
    let statMixins = [];

    if (this.passive?.statMixin !== undefined) {
      statMixins.push(this.passive.statMixin);
    }

    if (this.passiveData?.statBonuses !== undefined) {
      this.passiveData.statBonuses.forEach(({ stat, value }) => {
        statMixins.push({
          apply: (stats: Stats) => {
            stats[stat] = value + (stats[stat] ?? 0);
          },
        });
      });
    }

    return statMixins;
  }

  getPassiveModifierMixins(): ModifierMixin[] {
    if (this.passive?.modifierMixin === undefined) {
      return [];
    }

    return [this.passive.modifierMixin];
  }

  // Override in derived classes if weapon does special damage instance
  getTalentFns(_refinement: number): Talents {
    return {};
  }
}
