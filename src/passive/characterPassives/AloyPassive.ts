import { Stats, TalentParams } from '../../data/types';
import { CharacterOption } from '../../option/characterOptions';
import {
  IOptionBoolean,
  IOptionNumber,
  IStatsApplicable,
} from '../../option/Option';
import { CharacterPassive } from '../types';

export function aloyAscension1(params: TalentParams): CharacterPassive {
  class AloyOptionAscension1
    extends CharacterOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super('aloyAscension1');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value) {
          stats.atkBonus = params[0] * 2 + (stats.atkBonus ?? 0);
        }
      },
    };
  }

  return {
    id: 'aloyAscension1',
    options: [AloyOptionAscension1],
  };
}

export function aloyAscension4(params: TalentParams): CharacterPassive {
  class AloyOptionAscension4
    extends CharacterOption
    implements IOptionNumber, IStatsApplicable
  {
    value = 0;

    constructor() {
      super('aloyAscension4');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value > 0) {
          let stacks = this.value;
          if (stacks > 10) {
            stacks = 10;
          }

          const cryoDmgBonus = params[0] * stacks;
          stats.cryoDmgBonus = cryoDmgBonus + (stats.cryoDmgBonus ?? 0);
        }
      },
    };
  }

  return {
    id: 'aloyAscension4',
    options: [AloyOptionAscension4],
  };
}
