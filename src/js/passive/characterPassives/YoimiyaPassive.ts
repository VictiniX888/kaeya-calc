import { Stats, TalentParams } from '../../../data/types';
import { CharacterOption } from '../../option/characterOptions';
import { IOptionNumber, IStatsApplicable } from '../../option/Option';
import { CharacterPassive } from '../types';

export function yoimiyaAscension1(params: TalentParams): CharacterPassive {
  class YoimiyaOptionAscension1
    extends CharacterOption
    implements IOptionNumber, IStatsApplicable
  {
    value = 0;

    constructor() {
      super('yoimiyaAscension1');
    }

    statMixin = {
      apply: (stats: Stats) => {
        let pyroDmgBonus = this.value * params[0];
        if (this.value < 0 || this.value > 10) {
          pyroDmgBonus = NaN;
        }

        stats.pyroDmgBonus = pyroDmgBonus + (stats.pyroDmgBonus ?? 0);
      },
    };
  }

  return {
    id: 'yoimiyaAscension1',
    options: [YoimiyaOptionAscension1],
  };
}
