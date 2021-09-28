import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class BraveHeart4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('braveHeart4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        const params = getArtifactSetBonusParams('braveheart', 4);
        stats.dmgBonus = params[0] + (stats.dmgBonus ?? 0);
      }
    },
  };
}

const braveHeartOptions = [BraveHeart4PcOption];
export default braveHeartOptions;
