import DamageModifier from '../../modifier/DamageModifer';
import { CharacterPassive } from '../../passive/types';

export const tartagliaAscension0: CharacterPassive = {
  id: 'tartagliaAscension0',
  ascensionLevel: 0,
  options: [],
  modifierMixin: {
    apply: (modifier: DamageModifier) => {
      modifier.talentAttackLevel += 1;
    },
  },
};

const tartagliaPassives = [tartagliaAscension0];
export default tartagliaPassives;
