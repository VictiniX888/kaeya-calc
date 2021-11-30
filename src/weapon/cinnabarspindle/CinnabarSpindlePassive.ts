import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import DamageModifier from '../../modifier/DamageModifer';
import { IModifierApplicable, IOptionBoolean } from '../../option/Option';
import WeaponOption from '../../option/weaponOptions/WeaponOption';
import { WeaponPassive } from '../../passive/types';

export function cinnabarSpindlePassive(refinement: number): WeaponPassive {
  const params = getWeaponPassiveParams('cinnabarspindle', refinement);

  class CinnabarSpindleOption
    extends WeaponOption
    implements IOptionBoolean, IModifierApplicable
  {
    value = false;

    constructor() {
      super('cinnabarSpindlePassive');
    }

    modifierMixin = {
      apply: (modifier: DamageModifier, stats: Stats) => {
        if (this.value) {
          modifier.skillFlatDmg =
            stats.flatDef * params[0] + (modifier.skillFlatDmg ?? 0);
        }
      },
    };
  }

  return {
    id: 'cinnabarspindle',
    options: [CinnabarSpindleOption],
  };
}
