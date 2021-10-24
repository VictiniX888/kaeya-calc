import { Stats, TalentParams } from '../../data/types';
import { WeaponPassive } from '../types';

export function theCatchPassive(params: TalentParams): WeaponPassive {
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
