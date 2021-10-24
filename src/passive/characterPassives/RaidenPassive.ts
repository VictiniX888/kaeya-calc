import { Stats, TalentParams } from '../../data/types';
import { Priority } from '../../option/Mixin';
import { CharacterPassive } from '../types';

export function raidenAscension4(params: TalentParams): CharacterPassive {
  return {
    id: 'raidenAscension4',
    options: [],
    statMixin: {
      priority: Priority.Last,
      apply: (stats: Stats) => {
        const energyRecharge = stats.energyRecharge ?? 1;
        const electroDmgBonus = params[2] * (energyRecharge - 1) * 100;
        stats.electroDmgBonus = electroDmgBonus + (stats.electroDmgBonus ?? 0);
      },
    },
  };
}
