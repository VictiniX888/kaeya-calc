import { getTalentData } from '../../data/Data';
import { Stats } from '../../data/types';
import DamageModifier from '../../modifier/DamageModifer';
import { CharacterPassive } from '../../passive/types';

const [, a4Data] = getTalentData('kokomi').passives;
const a4Params = a4Data.params;

const kokomiAscension0: CharacterPassive = {
  id: 'kokomiAscension0',
  ascensionLevel: 0,
  options: [],
  statMixin: {
    apply: (stats: Stats) => {
      stats.critRate = (stats.critRate ?? 0) - 1;
      if (stats.critRate < 0) {
        stats.critRate = 0;
      }

      stats.healingBonus = 0.25 + (stats.healingBonus ?? 0);
    },
  },
};

const kokomiAscension4: CharacterPassive = {
  id: 'kokomiAscension4',
  ascensionLevel: 4,
  options: [],
  modifierMixin: {
    apply: (modifier: DamageModifier) => {
      modifier.kokomiHealingBonusDmg = a4Params[0];
    },
  },
};

const kokomiPassives = [kokomiAscension0, kokomiAscension4];
export default kokomiPassives;
