import { getTalentData } from '../../data/Data';
import { Stats } from '../../data/types';
import { Priority } from '../../option/Mixin';
import { CharacterPassive } from '../../passive/types';

const [, a4Data] = getTalentData('raiden').passives;
const a4Params = a4Data.params;

const raidenAscension4: CharacterPassive = {
  id: 'raidenAscension4',
  ascensionLevel: 4,
  options: [],
  statMixin: {
    priority: Priority.Last,
    apply: (stats: Stats) => {
      const energyRecharge = stats.energyRecharge ?? 1;
      const electroDmgBonus = a4Params[2] * (energyRecharge - 1) * 100;
      stats.electroDmgBonus = electroDmgBonus + (stats.electroDmgBonus ?? 0);
    },
  },
};

const raidenPassives = [raidenAscension4];
export default raidenPassives;
