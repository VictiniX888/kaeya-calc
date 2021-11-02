import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import { IOptionNumber, IStatsApplicable } from '../../option/Option';
import WeaponOption from '../../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../../passive/types';

export const watatsumiWavewalkerPassive =
  (id: string) =>
  (refinement: number): WeaponPassive => {
    const params = getWeaponPassiveParams(id, refinement);

    class WatatsumiWavewalkerOption
      extends WeaponOption
      implements IOptionNumber, IStatsApplicable
    {
      value = 0;

      constructor() {
        super('watatsumiWavewalkerPassive');
      }

      statMixin = {
        apply: (stats: Stats) => {
          if (this.value > 0) {
            let burstDmgBonus = this.value * (params[0] / 100);
            if (burstDmgBonus > params[1]) {
              burstDmgBonus = params[1];
            }
            stats.burstDmgBonus = burstDmgBonus + (stats.burstDmgBonus ?? 0);
          }
        },
      };
    }

    return {
      id,
      options: [WatatsumiWavewalkerOption],
    };
  };
