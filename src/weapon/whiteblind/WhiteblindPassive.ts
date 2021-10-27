import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import { IOptionNumber, IStatsApplicable } from '../../option/Option';
import WeaponOption from '../../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../../passive/types';

export function whiteblindPassive(refinement: number): WeaponPassive {
  const params = getWeaponPassiveParams('whiteblind', refinement);

  class WhiteblindOption
    extends WeaponOption
    implements IOptionNumber, IStatsApplicable
  {
    value = 0;

    constructor() {
      super('whiteblindStacks');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value > 0) {
          let stacks = this.value;
          if (this.value > 4) {
            stacks = 4;
          }

          stats.atkBonus = params[0] * stacks + (stats.atkBonus ?? 0);
          stats.defBonus = params[0] * stacks + (stats.defBonus ?? 0);
        }
      },
    };
  }

  return {
    id: 'whiteblind',
    options: [WhiteblindOption],
  };
}
