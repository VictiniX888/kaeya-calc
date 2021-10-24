import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import { IModifierApplicable, IOptionBoolean } from '../Option';
import CharacterOption from './CharacterOption';
import ElementalAbsoprtionOption from './ElementalAbsorptionOption';

class KazuhaOptionInfusion
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('infusionAnemoPlunge');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.infusionPlunge = Element.Anemo;
      }
    },
  };
}

const kazuhaOptions = [KazuhaOptionInfusion, ElementalAbsoprtionOption];
export default kazuhaOptions;
