import { getTalentData } from '../../data/Data';
import { Stats } from '../../data/types';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import Constellation, {
  ConstellationBurst,
  ConstellationSkill,
} from '../../constellation/Constellation';

const [, , , , , { params: c6Params }] = getTalentData('thoma').constellations;

class ThomaOptionConstellation6
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('thomaConstellation6');
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.normalDmgBonus = c6Params[0] + (stats.normalDmgBonus ?? 0);
        stats.chargedDmgBonus = c6Params[0] + (stats.chargedDmgBonus ?? 0);
        stats.plungeDmgBonus = c6Params[0] + (stats.plungeDmgBonus ?? 0);
      }
    },
  };
}

const thomaConstellation3 = ConstellationSkill(3);
const thomaConstellation5 = ConstellationBurst(5);

const thomaConstellation6: Constellation = {
  constellationLevel: 6,
  options: [ThomaOptionConstellation6],
};

const thomaConstellations = [
  thomaConstellation3,
  thomaConstellation5,
  thomaConstellation6,
];
export default thomaConstellations;
