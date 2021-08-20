import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class RetracingBolide4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('retracingBolide4Pc', 4);
  }

  applyOnStats = (stats: Stats) => {
    if (this.value) {
      const params = getArtifactSetBonusParams('retracingbolide', 4);
      stats.normalDmgBonus = params[0] + (stats.normalDmgBonus ?? 0);
      stats.chargedDmgBonus = params[0] + (stats.chargedDmgBonus ?? 0);
    }
  };
}

const retracingBolideOptions = [RetracingBolide4PcOption];
export default retracingBolideOptions;
