import { Stats, TalentParams } from '../../../data/types';
import { Priority } from '../../option/Mixin';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import WeaponOption from '../../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../types';

export function staffOfHomaPassive(params: TalentParams): WeaponPassive {
  class StaffOfHomaOption
    extends WeaponOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super('staffOfHomaAtkBonus');
    }

    statMixin = {
      priority: Priority.Last,
      apply: (stats: Stats) => {
        const totalHp =
          (stats.baseHp ?? 0) * (1 + (stats.hpBonus ?? 0)) +
          (stats.flatHp ?? 0);

        let flatAtkBonus = totalHp * params[1];
        if (this.value) {
          flatAtkBonus += totalHp * params[2];
        }

        stats.flatAtk = flatAtkBonus + (stats.flatAtk ?? 0);
      },
    };
  }

  return {
    id: 'staffOfHoma',
    options: [StaffOfHomaOption],
  };
}
