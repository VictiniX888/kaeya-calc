import { AscensionBonus, StatCurveMapping, Stats } from '../../data/types';
import {
  getWeaponData as getData,
  getWeaponAscensionBonusData as getAscensionBonusData,
  getWeaponStatCurveAt as getStatCurveAt,
  getAscensionBonusAt,
} from '../Data';
import type { WeaponType } from './types';

export default class Weapon {
  constructor(id: string, level: number, hasAscended: boolean) {
    this._weaponLevel = level;
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
    if (data !== undefined) {
      this.name = data.name;
      this.type = data.type as WeaponType;
      this.rank = data.rank;
      this.baseStats = data.baseStats;
      this.statCurveMapping = data.statCurves;
      this.ascensionBonuses = getAscensionBonusData(value);
    }

    this.stats = this.getStatsAt(this.weaponLevel, this.hasAscended);
  }

  name?: string;
  type?: WeaponType;
  rank?: number;
  baseStats?: Stats;
  statCurveMapping?: StatCurveMapping;
  ascensionBonuses?: AscensionBonus[];

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

  stats: Stats = {};

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
}
