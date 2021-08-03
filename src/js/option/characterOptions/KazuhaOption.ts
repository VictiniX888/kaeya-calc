import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import { IModifierApplicable, IOptionBoolean } from '../Option';
import CharacterOption from './CharacterOption';

class KazuhaOptionInfusion
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('infusionAnemoPlunge');
  }

  applyOnModifier(modifier: DamageModifier) {
    if (this.value) {
      modifier.infusionPlunge = Element.Anemo;
    }
  }
}

const kazuhaOptions = [KazuhaOptionInfusion];
export default kazuhaOptions;
