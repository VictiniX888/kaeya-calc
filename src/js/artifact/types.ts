import type { Stat } from '../../data/types';

export interface InputStat extends Stat {
  rawValue: number;
}

export enum ArtifactType {
  Flower = 'flower',
  Feather = 'feather',
  Sands = 'sands',
  Goblet = 'goblet',
  Circlet = 'circlet',
}
