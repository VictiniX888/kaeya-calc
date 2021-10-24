import { Stats, TalentParams } from '../../data/types';
import { WeaponPassive } from '../types';

export function luxuriousSeaLordPassive(params: TalentParams): WeaponPassive {
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
