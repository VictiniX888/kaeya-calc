import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class Berserker4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('berserker4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        const params = getArtifactSetBonusParams('berserker', 4);
        stats.critRate = params[0] + (stats.critRate ?? 0);
      }
    },
  };
}

const berserkerOptions = [Berserker4PcOption];
export default berserkerOptions;
