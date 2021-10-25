import { getTalentData } from '../../data/Data';
import { Stats } from '../../data/types';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { IOptionNumber, IStatsApplicable } from '../../option/Option';
import { CharacterPassive } from '../../passive/types';

const [a1Data] = getTalentData('yoimiya').passives;
const a1Params = a1Data.params;

class YoimiyaOptionAscension1
  extends CharacterOption
  implements IOptionNumber, IStatsApplicable
{
  value = 0;

  constructor() {
    super('yoimiyaAscension1');
  }

  statMixin = {
    apply: (stats: Stats) => {
      let pyroDmgBonus = this.value * a1Params[0];
      if (this.value < 0 || this.value > 10) {
        pyroDmgBonus = NaN;
      }

      stats.pyroDmgBonus = pyroDmgBonus + (stats.pyroDmgBonus ?? 0);
    },
  };
}

const yoimiyaAscension1: CharacterPassive = {
  id: 'yoimiyaAscension1',
  ascensionLevel: 1,
  options: [YoimiyaOptionAscension1],
};

const yoimiyaPassives = [yoimiyaAscension1];
export default yoimiyaPassives;
