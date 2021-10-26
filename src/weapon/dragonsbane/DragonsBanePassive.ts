import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import WeaponOption from '../../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../../passive/types';

export function dragonsBanePassive(refinement: number): WeaponPassive {
  const params = getWeaponPassiveParams('dragonsbane', refinement);

  class DragonsBaneOption
    extends WeaponOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super('dragonsBanePassive');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value) {
          stats.dmgBonus = params[0] + (stats.dmgBonus ?? 0);
        }
      },
    };
  }

  return {
    id: 'dragonsBane',
    options: [DragonsBaneOption],
  };
}
