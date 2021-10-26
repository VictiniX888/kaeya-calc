import { getWeaponPassiveParams } from '../../data/Data';
import { Stats } from '../../data/types';
import DamageModifier from '../../modifier/DamageModifer';
import { WeaponPassive } from '../../passive/types';

export function everlastingMoonglowPassive(refinement: number): WeaponPassive {
  const params = getWeaponPassiveParams('everlastingmoonglow', refinement);

  return {
    id: 'everlastingMoonglow',
    options: [],
    modifierMixin: {
      apply: (modifier: DamageModifier, stats: Stats) => {
        modifier.normalAttackFlatDmg =
          params[1] * (stats.flatHp ?? 0) + (modifier.normalAttackFlatDmg ?? 0);
      },
    },
  };
}
