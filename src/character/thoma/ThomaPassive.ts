import { getTalentData } from '../../data/Data';
import DamageModifier from '../../modifier/DamageModifer';
import { CharacterPassive } from '../../passive/types';

const [, a4Data] = getTalentData('thoma').passives;
const a4Params = a4Data.params;

const thomaAscension4: CharacterPassive = {
  id: 'thomaAscension4',
  ascensionLevel: 4,
  options: [],
  modifierMixin: {
    apply: (modifier: DamageModifier) => {
      modifier.thomaHpBonusDmg = a4Params[0];
    },
  },
};

const thomaPassives = [thomaAscension4];
export default thomaPassives;
