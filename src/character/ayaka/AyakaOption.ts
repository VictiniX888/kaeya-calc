import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import { IModifierApplicable, IOptionBoolean } from '../../option/Option';
import CharacterOption from '../../option/characterOptions/CharacterOption';

class AyakaOptionInfusion
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('infusionCryo');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.infusion = Element.Cryo;
      }
    },
  };
}

const ayakaOptions = [AyakaOptionInfusion];
export default ayakaOptions;
