import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../data/types';

class HeartOfDepth4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('heartOfDepth4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        const params = getArtifactSetBonusParams('heartofdepth', 4);
        stats.normalDmgBonus = params[0] + (stats.normalDmgBonus ?? 0);
        stats.chargedDmgBonus = params[0] + (stats.chargedDmgBonus ?? 0);
      }
    },
  };
}

const heartOfDepthOptions = [HeartOfDepth4PcOption];
export default heartOfDepthOptions;
