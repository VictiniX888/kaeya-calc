import { IOptionBoolean } from '../../option/Option';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';

class ZhongliOptionShield extends CharacterOption implements IOptionBoolean {
  value = false;

  constructor() {
    super('zhongliShield');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        Object.values(Element).forEach((element) =>
          modifier.enemyResReduction.set(element, 0.2)
        );
      }
    },
  };
}

const zhongliTeamOptions = [ZhongliOptionShield];
export default zhongliTeamOptions;
