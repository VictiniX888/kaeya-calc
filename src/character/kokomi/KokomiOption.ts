import DamageModifier from '../../modifier/DamageModifer';
import { IModifierApplicable, IOptionBoolean } from '../../option/Option';
import CharacterOption from '../../option/characterOptions/CharacterOption';

class KokomiOptionBurst
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('kokomiBurst');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.kokomiBurst = true;
      }
    },
  };
}

const kokomiOptions = [KokomiOptionBurst];
export default kokomiOptions;
