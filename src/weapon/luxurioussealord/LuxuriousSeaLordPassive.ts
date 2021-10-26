import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import { WeaponPassive } from '../../passive/types';

export function luxuriousSeaLordPassive(refinement: number): WeaponPassive {
  const params = getWeaponPassiveParams('luxurioussealord', refinement);

  return {
    id: 'luxuriousSeaLord',
    options: [],

    statMixin: {
      apply: (stats: Stats) => {
        stats.burstDmgBonus = params[0] + (stats.burstDmgBonus ?? 0);
      },
    },
  };
}
