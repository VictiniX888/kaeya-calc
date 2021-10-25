import { getTalentData } from '../../data/Data';
import { Stats } from '../../data/types';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { CharacterPassive } from '../../passive/types';

const [, a4Data] = getTalentData('hutao').passives;
const a4Params = a4Data.params;

class HuTaoOptionAscension4
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('hutaoAscension4');
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.pyroDmgBonus = a4Params[1] + (stats.pyroDmgBonus ?? 0);
      }
    },
  };
}

const hutaoAscension4: CharacterPassive = {
  id: 'hutaoAscension4',
  ascensionLevel: 4,
  options: [HuTaoOptionAscension4],
};

const hutaoPassives = [hutaoAscension4];
export default hutaoPassives;
