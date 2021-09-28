import { Stats, TalentParams } from '../../../data/types';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import WeaponOption from '../../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../types';

export function engulfingLightningPassive(params: TalentParams): WeaponPassive {
  class EngulfingLightningOption
    extends WeaponOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super('engulfingLightningEnergyRecharge');
    }

    applyOnStats = (stats: Stats) => {
      if (this.value) {
        stats.energyRecharge = params[2] + (stats.energyRecharge ?? 0);
      }
    };
  }

  return {
    id: 'engulfingLightning',
    options: [EngulfingLightningOption],

    statMixin: (stats: Stats) => {
      let atkBonus = (stats.energyRecharge - 1) * params[0];
      if (atkBonus > params[1]) {
        atkBonus = params[1];
      }

      stats.atkBonus = atkBonus + (stats.atkBonus ?? 0);
    },
  };
}
