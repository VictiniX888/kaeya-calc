import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import { IModifierApplicable, IOptionBoolean } from '../Option';
import CharacterOption from './CharacterOption';

class DilucOptionInfusion
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('infusionPyro');
  }

  applyOnModifier(modifier: DamageModifier) {
    if (this.value) {
      modifier.infusion = Element.Pyro;
    }
  }
}

const dilucOptions: typeof CharacterOption[] = [DilucOptionInfusion];
export default dilucOptions;
