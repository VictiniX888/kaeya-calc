import { Stats, TalentParams } from '../../../data/types';
import DamageModifier from '../../modifier/DamageModifer';
import { WeaponPassive } from '../types';

export function everlastingMoonglowPassive(
  params: TalentParams
): WeaponPassive {
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
