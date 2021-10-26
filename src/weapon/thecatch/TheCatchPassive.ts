import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import { WeaponPassive } from '../../passive/types';

export function theCatchPassive(refinement: number): WeaponPassive {
  const params = getWeaponPassiveParams('thecatch', refinement);

  return {
    id: 'theCatch',
    options: [],
    statMixin: {
      apply: (stats: Stats) => {
        stats.burstDmgBonus = params[0] + (stats.burstDmgBonus ?? 0);
        stats.burstCritRate = params[1] + (stats.burstCritRate ?? 0);
      },
    },
  };
}
