import { Stats } from '../../data/types';
import * as statUtils from '../Stat';
import type { ArtifactType, InputStat } from './types';

export default class Artifact {
  type: ArtifactType;

  mainStat: InputStat = {
    stat: '',
    rawValue: NaN,
    value: NaN,
  };

  subStats: InputStat[] = [
    {
      stat: '',
      rawValue: NaN,
      value: NaN,
    },
    {
      stat: '',
      rawValue: NaN,
      value: NaN,
    },
    {
      stat: '',
      rawValue: NaN,
      value: NaN,
    },
    {
      stat: '',
      rawValue: NaN,
      value: NaN,
    },
  ];

  constructor(type: ArtifactType) {
    this.type = type;
  }

  // Can be called with one of the two of stat and value (the other will be undefined)
  setStat(
    statObj: InputStat,
    stat: string,
    value: number,
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

  /*
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
          stats[subStat.stat] = subStat.value;
        } else {
          stats[subStat.stat] = NaN;
        }
      }
    });

    return stats;
  }
}

export const mainStatProps = {
  Flower: ['flatHp'],

  Feather: ['flatAtk'],

  Sands: [
    'hpBonus',
    'atkBonus',
    'defBonus',
    'elementalMastery',
    'energyRecharge',
  ],

  Goblet: [
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

  Circlet: [
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
