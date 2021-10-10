import { Stats, TalentParams } from '../../../data/types';
import { CharacterOption } from '../../option/characterOptions';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { CharacterPassive } from '../types';

export function beidouAscension4(params: TalentParams): CharacterPassive {
  class BeidouOptionAscension4
    extends CharacterOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super('beidouAscension4');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value) {
          stats.normalDmgBonus = params[0] + (stats.normalDmgBonus ?? 0);
          stats.chargedDmgBonus = params[0] + (stats.chargedDmgBonus ?? 0);
        }
      },
    };
  }

  return {
    id: 'beidouAscension4',
    options: [BeidouOptionAscension4],
  };
}
