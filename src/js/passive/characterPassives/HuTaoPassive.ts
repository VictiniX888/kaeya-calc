import { Stats, TalentParams } from '../../../data/types';
import { CharacterOption } from '../../option/characterOptions';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { CharacterPassive } from '../types';

export function hutaoAscension4(params: TalentParams): CharacterPassive {
  class HuTaoOptionAscension4
    extends CharacterOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super('hutaoAscension4');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value) {
          stats.pyroDmgBonus = params[1] + (stats.pyroDmgBonus ?? 0);
        }
      },
    };
  }

  return {
    id: 'hutaoAscension4',
    options: [HuTaoOptionAscension4],
  };
}
