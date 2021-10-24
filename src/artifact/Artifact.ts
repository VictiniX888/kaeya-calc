import { Stat, Stats } from '../data/types';
import { getArtifactMainStatValue } from '../data/Data';
import { ArtifactType, InputStat } from './types';

export default class Artifact {
  type: ArtifactType;

  private _rarity: number;
  get rarity(): number {
    return this._rarity;
  }
  set rarity(value: number) {
    this._rarity = value;
    this.updateMainStat(this.rarity, this.level, this.mainStat.stat);
  }

  private _level: number;
  get level(): number {
    return this._level;
  }
  set level(value: number) {
    this._level = value;
    this.updateMainStat(this.rarity, this.level, this.mainStat.stat);
  }

  mainStat: Stat = { stat: '', value: NaN };

  subStats: InputStat[] = [
    new InputStat(),
    new InputStat(),
    new InputStat(),
    new InputStat(),
  ];

  constructor(
    type: ArtifactType,
    rarity: number,
    level: number,
    mainStatProp: string
  ) {
    this.type = type;
    this._rarity = rarity;
    this._level = level;
    this.mainStat.stat = mainStatProp;

    this.updateMainStat(rarity, level, mainStatProp);
  }

  updateMainStat(rarity: number, level: number, prop: string) {
    this.setMainStatValue(getArtifactMainStatValue(rarity, level, prop));
  }

  setMainStatProp(prop: string) {
    this.mainStat.stat = prop;
    this.updateMainStat(this.rarity, this.level, prop);
  }

  setMainStatValue(value: number) {
    this.mainStat.value = value;
  }

  setSubStatProp(i: number, prop: string) {
    this.subStats[i].setProp(prop);
  }

  setSubStatInputValue(i: number, value: number) {
    this.subStats[i].setInputValue(value);
  }

  setSubStatValue(i: number, value: number) {
    this.subStats[i].setValue(value);
  }

  /*
  // Can be called with one of the two of stat and value (the other will be undefined)
  setStat(
    statObj: InputStat,
    stat?: string,
    value?: number,
    isPercentage = false
  ) {
    if (stat === undefined && value !== undefined) {
      statObj.rawValue = value;
      statObj.value = statUtils.convertStatValue(value, isPercentage);
    } else if (stat !== undefined && value === undefined) {
      statObj.stat = stat;
      statObj.value = statUtils.convertStatValue(
        statObj.rawValue,
        isPercentage
      );
    } else if (stat !== undefined && value !== undefined) {
      statObj.stat = stat;
      statObj.rawValue = value;
      statObj.value = statUtils.convertStatValue(value, isPercentage);
    }
  }

  setMainStat(stat, value, isPercentage = false) {
      this.setStat(this.mainStat, stat, value, isPercentage);
  }

  // Set substat in a spefiic position
  setSubStat(pos, stat, value, isPercentage = false) {
      this.setStat(this.subStats[pos], stat, value, isPercentage);
  }
  */

  // Returns object containing stat: value mapping, including both main stat and substats
  getStats() {
    let stats: Stats = {};

    if (this.mainStat.stat !== '') {
      if (!isNaN(this.mainStat.value)) {
        stats[this.mainStat.stat] = this.mainStat.value;
      } else {
        stats[this.mainStat.stat] = NaN;
      }
    }

    this.subStats.forEach((subStat) => {
      if (subStat.stat !== '') {
        if (!isNaN(subStat.value)) {
          stats[subStat.stat] = subStat.value + (stats[subStat.stat] ?? 0);
        }
      }
    });

    return stats;
  }
}

export const mainStatProps = {
  flower: ['flatHp'],

  feather: ['flatAtk'],

  sands: [
    'hpBonus',
    'atkBonus',
    'defBonus',
    'elementalMastery',
    'energyRecharge',
  ],

  goblet: [
    'hpBonus',
    'atkBonus',
    'defBonus',
    'elementalMastery',
    'anemoDmgBonus',
    'cryoDmgBonus',
    'electroDmgBonus',
    'geoDmgBonus',
    'hydroDmgBonus',
    'pyroDmgBonus',
    'physicalDmgBonus',
  ],

  circlet: [
    'hpBonus',
    'atkBonus',
    'defBonus',
    'elementalMastery',
    'critRate',
    'critDmg',
    'healingBonus',
  ],
};

export const subStatProps = [
  'flatHp',
  'flatAtk',
  'flatDef',
  'hpBonus',
  'atkBonus',
  'defBonus',
  'elementalMastery',
  'energyRecharge',
  'critRate',
  'critDmg',
];
