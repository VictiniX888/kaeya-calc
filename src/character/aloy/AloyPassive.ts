import { getTalentData } from '../../data/Data';
import { Stats } from '../../data/types';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import {
  IOptionBoolean,
  IOptionNumber,
  IStatsApplicable,
} from '../../option/Option';
import { CharacterPassive } from '../../passive/types';

const [a1Data, a4Data] = getTalentData('aloy').passives;
const a1Params = a1Data.params;
const a4Params = a4Data.params;

class AloyOptionAscension1
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('aloyAscension1');
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.atkBonus = a1Params[0] * 2 + (stats.atkBonus ?? 0);
      }
    },
  };
}

const aloyAscension1: CharacterPassive = {
  id: 'aloyAscension1',
  ascensionLevel: 1,
  options: [AloyOptionAscension1],
};

class AloyOptionAscension4
  extends CharacterOption
  implements IOptionNumber, IStatsApplicable
{
  value = 0;

  constructor() {
    super('aloyAscension4');
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value > 0) {
        let stacks = this.value;
        if (stacks > 10) {
          stacks = 10;
        }

        const cryoDmgBonus = a4Params[0] * stacks;
        stats.cryoDmgBonus = cryoDmgBonus + (stats.cryoDmgBonus ?? 0);
      }
    },
  };
}

const aloyAscension4: CharacterPassive = {
  id: 'aloyAscension4',
  ascensionLevel: 4,
  options: [AloyOptionAscension4],
};

const aloyPassives = [aloyAscension1, aloyAscension4];
export default aloyPassives;
