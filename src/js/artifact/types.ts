import type { Stat } from '../../data/types';
import { propMapping } from '../Data';
import { convertStatValue } from '../Stat';

export class InputStat implements Stat {
  stat: string;
  value: number;
  rawValue: number;

  constructor(stat: string = '', value: number = NaN, rawValue: number = NaN) {
    this.stat = stat;
    this.value = value;
    this.rawValue = rawValue;
  }

  setProp(stat: string) {
    this.stat = stat;
    if (stat !== '') {
      this.value = convertStatValue(
        this.rawValue,
        propMapping[stat].isPercentage
      );
    }
  }

  setValue(value: number) {
    this.rawValue = value;
    if (this.stat !== '') {
      this.value = convertStatValue(value, propMapping[this.stat].isPercentage);
    }
  }
}

export enum ArtifactType {
  Flower = 'flower',
  Feather = 'feather',
  Sands = 'sands',
  Goblet = 'goblet',
  Circlet = 'circlet',
}

export type ArtifactSetBonusFunction = (params: number[]) => Stat[];