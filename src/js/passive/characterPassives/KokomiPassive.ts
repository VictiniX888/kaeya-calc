import { Stats, TalentParams } from '../../../data/types';
import DamageModifier from '../../modifier/DamageModifer';
import { CharacterPassive } from '../types';

export function kokomiAscension0(_params: TalentParams): CharacterPassive {
  return {
    id: 'kokomiAscension0',
    options: [],
    statMixin: (stats: Stats) => {
      stats.critRate = (stats.critRate ?? 0) - 1;
      if (stats.critRate < 0) {
        stats.critRate = 0;
      }

      stats.healingBonus = 0.25 + (stats.healingBonus ?? 0);
    },
  };
}

export function kokomiAscension4(params: TalentParams): CharacterPassive {
  return {
    id: 'kokomiAscension4',
    options: [],
    modifierMixin: (modifier: DamageModifier) => {
      modifier.kokomiHealingBonusDmg = params[0];
    },
  };
}
