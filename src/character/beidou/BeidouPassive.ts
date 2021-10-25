import { getTalentData } from '../../data/Data';
import { Stats } from '../../data/types';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { CharacterPassive } from '../../passive/types';

const [, a4Data] = getTalentData('beidou').passives;
const a4Params = a4Data.params;

class BeidouOptionAscension4
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('beidouAscension4');
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.normalDmgBonus = a4Params[0] + (stats.normalDmgBonus ?? 0);
        stats.chargedDmgBonus = a4Params[0] + (stats.chargedDmgBonus ?? 0);
      }
    },
  };
}

const beidouAscension4: CharacterPassive = {
  id: 'beidouAscension4',
  ascensionLevel: 4,
  options: [BeidouOptionAscension4],
};

const beidouPassives = [beidouAscension4];
export default beidouPassives;
