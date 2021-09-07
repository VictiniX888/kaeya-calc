import DamageModifier from '../../modifier/DamageModifer';
import { IModifierApplicable, IOptionBoolean } from '../Option';
import CharacterOption from './CharacterOption';

class KokomiOptionBurst
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('kokomiBurst');
  }

  applyOnModifier = (modifier: DamageModifier) => {
    if (this.value) {
      modifier.kokomiBurst = true;
    }
  };
}

const kokomiOptions = [KokomiOptionBurst];
export default kokomiOptions;
