import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class Thundersoother4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('thundersoother4Pc', 4);
  }

  applyOnStats(stats: Stats) {
    if (this.value) {
      const params = getArtifactSetBonusParams('thundersoother', 4);
      stats.dmgBonus = params[0] + (stats.dmgBonus ?? 0);
    }
  }
}

const thundersootherOptions = [Thundersoother4PcOption];
export default thundersootherOptions;
