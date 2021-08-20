import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import { IModifierApplicable, IOptionBoolean } from '../Option';
import CharacterOption from './CharacterOption';

class ChongyunOptionInfusion
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false; // set default value

  constructor() {
    super('infusionCryo'); // set ID
  }

  applyOnModifier = (modifier: DamageModifier) => {
    if (this.value) {
      modifier.infusion = Element.Cryo;
    }
  };
}

const chongyunOptions: typeof CharacterOption[] = [ChongyunOptionInfusion];
export default chongyunOptions;
