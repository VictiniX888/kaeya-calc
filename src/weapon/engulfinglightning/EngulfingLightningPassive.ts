import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import { Priority } from '../../option/Mixin';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import WeaponOption from '../../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../../passive/types';

export function engulfingLightningPassive(refinement: number): WeaponPassive {
  const params = getWeaponPassiveParams('engulfinglightning', refinement);

  class EngulfingLightningOption
    extends WeaponOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super('engulfingLightningEnergyRecharge');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value) {
          stats.energyRecharge = params[2] + (stats.energyRecharge ?? 0);
        }
      },
    };
  }

  return {
    id: 'engulfingLightning',
    options: [EngulfingLightningOption],

    statMixin: {
      priority: Priority.Last,
      apply: (stats: Stats) => {
        let atkBonus = (stats.energyRecharge - 1) * params[0];
        if (atkBonus > params[1]) {
          atkBonus = params[1];
        }

        stats.atkBonus = atkBonus + (stats.atkBonus ?? 0);
      },
    },
  };
}
