import DamageModifier from '../../modifier/DamageModifer';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { IModifierApplicable, IOptionBoolean } from '../../option/Option';
import { CharacterPassive } from '../../passive/types';

class AlbedoOptionAscension1
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('albedoAscension1');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.albedoBlossomDmgBonus = 0.25;
      }
    },
  };
}

const albedoAscension1: CharacterPassive = {
  id: 'albedoAscension1',
  ascensionLevel: 1,
  options: [AlbedoOptionAscension1],
};

const albedoPassives = [albedoAscension1];
export default albedoPassives;
