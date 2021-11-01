import DamageModifier from '../../modifier/DamageModifer';
import Reaction from '../../modifier/Reaction';
import { IModifierApplicable, IOptionPicker } from '../Option';
import CharacterOption from './CharacterOption';

class ReactionOption
  extends CharacterOption
  implements IOptionPicker, IModifierApplicable
{
  value = '';
  choices = Object.values(Reaction);

  constructor() {
    super('reaction');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value !== '') {
        modifier.reaction = this.value as Reaction;
      } else {
        modifier.reaction = Reaction.None;
      }
    },
  };
}

export default ReactionOption;
