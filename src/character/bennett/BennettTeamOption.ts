import {
  IOptionBoolean,
  IOptionNumber,
  IStatsApplicable,
} from '../../option/Option';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Stats } from '../../data/types';
import { getOptionValue } from '../../option/OptionUtils';

class BennettOptionAtkBuff extends CharacterOption implements IOptionNumber {
  value = 0;

  constructor() {
    super('bennettAtkBuff');
  }
}

class BennettOptionBurst
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('bennettBurst', [BennettOptionAtkBuff]);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        const atkBuff = getOptionValue(this.children[0]) as number;
        stats.flatAtk = atkBuff + (stats.flatAtk ?? 0);
      }
    },
  };
}

const bennettTeamOptions = [BennettOptionBurst];
export default bennettTeamOptions;
