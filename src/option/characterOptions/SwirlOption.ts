import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import { ModifierMixin } from '../Mixin';
import { IModifierApplicable, IOptionPicker } from '../Option';
import CharacterOption from './CharacterOption';

class SwirlOption
  extends CharacterOption
  implements IOptionPicker, IModifierApplicable
{
  value = '';
  choices = [Element.Cryo, Element.Electro, Element.Hydro, Element.Pyro];

  constructor() {
    super('swirlElement');
  }

  modifierMixin: ModifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value !== '') {
        modifier.swirlElement = this.value as Element;
      }
    },
  };
}

export default SwirlOption;
