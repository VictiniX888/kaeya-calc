import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import { IOptionNumber, IStatsApplicable } from '../../option/Option';
import WeaponOption from '../../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../../passive/types';

export function polarStarPassive(refinement: number): WeaponPassive {
  const params = getWeaponPassiveParams('polarstar', refinement);

  class PolarStarOption
    extends WeaponOption
    implements IOptionNumber, IStatsApplicable
  {
    value = 0;

    constructor() {
      super('polarStarStacks');
    }

    statMixin = {
      apply: (stats: Stats) => {
        let stacks = this.value;

        if (stacks > 0) {
          if (stacks > 4) {
            stacks = 4;
          }

          stats.atkBonus = params[stacks + 1] + (stats.atkBonus ?? 0);
        }
      },
    };
  }

  return {
    id: 'polarStar',
    options: [PolarStarOption],

    statMixin: {
      apply: (stats: Stats) => {
        stats.skillDmgBonus = params[0] + (stats.skillDmgBonus ?? 0);
        stats.burstDmgBonus = params[0] + (stats.burstDmgBonus ?? 0);
      },
    },
  };
}
