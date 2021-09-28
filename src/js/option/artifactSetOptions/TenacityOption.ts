import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class Tenacity4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('tenacity4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        const params = getArtifactSetBonusParams('tenacityofthemillelith', 4);
        stats.atkBonus = params[0] + (stats.atkBonus ?? 0);
        stats.shieldStrength = params[1] + (stats.shieldStrength ?? 0);
      }
    },
  };
}

const tenacityOptions = [Tenacity4PcOption];
export default tenacityOptions;
