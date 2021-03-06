import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import WeaponOption from '../../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../../passive/types';

export function solarPearlPassive(refinement: number): WeaponPassive {
  const params = getWeaponPassiveParams('solarpearl', refinement);

  class SolarPearlOptionNormalAttack
    extends WeaponOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super('solarPearlNormalAttack');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value) {
          stats.skillDmgBonus = params[0] + (stats.skillDmgBonus ?? 0);
          stats.burstDmgBonus = params[0] + (stats.burstDmgBonus ?? 0);
        }
      },
    };
  }

  class SolarPearlOptionSkillBurst
    extends WeaponOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super('solarPearlSkillBurst');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value) {
          stats.normalDmgBonus = params[0] + (stats.normalDmgBonus ?? 0);
        }
      },
    };
  }

  return {
    id: 'solarPearl',
    options: [SolarPearlOptionNormalAttack, SolarPearlOptionSkillBurst],
  };
}
