import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import { IModifierApplicable, IOptionBoolean } from '../../option/Option';
import CharacterOption from '../../option/characterOptions/CharacterOption';

class ChongyunOptionInfusion
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false; // set default value

  constructor() {
    super('infusionCryo'); // set ID
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.infusion = Element.Cryo;
      }
    },
  };
}

const chongyunOptions: typeof CharacterOption[] = [ChongyunOptionInfusion];
export default chongyunOptions;
