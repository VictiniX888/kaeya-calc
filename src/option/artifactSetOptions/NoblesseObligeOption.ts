import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../data/types';

class NoblesseOblige4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('noblesseOblige4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        const params = getArtifactSetBonusParams('noblesseoblige', 4);
        stats.atkBonus = params[0] + (stats.atkBonus ?? 0);
      }
    },
  };
}

const noblesseObligeOptions = [NoblesseOblige4PcOption];
export default noblesseObligeOptions;
