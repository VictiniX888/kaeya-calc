import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import { IModifierApplicable, IOptionPicker } from '../Option';
import CharacterOption from './CharacterOption';

class ElementalAbsoprtionOption
  extends CharacterOption
  implements IOptionPicker, IModifierApplicable
{
  value = '';
  choices = [Element.Cryo, Element.Electro, Element.Hydro, Element.Pyro];

  constructor() {
    super('elementalAbsorption');
  }

  applyOnModifier = (modifier: DamageModifier) => {
    if (this.value !== '') {
      modifier.elementalAbsorption = this.value as Element;
    }
  };
}

export default ElementalAbsoprtionOption;
