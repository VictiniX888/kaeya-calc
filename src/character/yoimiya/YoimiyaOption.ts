import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import { IModifierApplicable, IOptionBoolean } from '../../option/Option';
import CharacterOption from '../../option/characterOptions/CharacterOption';

class YoimiyaOptionSkill
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('yoimiyaSkill');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.infusionNormal = Element.Pyro;
        modifier.yoimiyaSkill = true;
      }
    },
  };
}

const yoimiyaOptions = [YoimiyaOptionSkill];
export default yoimiyaOptions;
