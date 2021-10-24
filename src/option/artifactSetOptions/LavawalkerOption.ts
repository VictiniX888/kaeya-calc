import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../data/types';

class Lavawalker4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('lavawalker4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        const params = getArtifactSetBonusParams('lavawalker', 4);
        stats.dmgBonus = params[0] + (stats.dmgBonus ?? 0);
      }
    },
  };
}

const lavawalkerOptions = [Lavawalker4PcOption];
export default lavawalkerOptions;
