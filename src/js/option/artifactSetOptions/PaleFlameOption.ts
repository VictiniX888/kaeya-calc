import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionNumber, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class PaleFlame4PcOption
  extends ArtifactSetOption
  implements IOptionNumber, IStatsApplicable
{
  value = 0;

  constructor() {
    super('paleFlame4Pc', 4);
  }

  applyOnStats = (stats: Stats) => {
    const params = getArtifactSetBonusParams('paleflame', 4);

    if (this.value >= 1) {
      stats.atkBonus = params[0] + (stats.atkBonus ?? 0);
    }

    if (this.value >= 2) {
      stats.atkBonus = params[0] + (stats.atkBonus ?? 0);
      stats.physicalDmgBonus = params[3] + (stats.physicalDmgBonus ?? 0);
    }
  };
}

const paleFlameOptions = [PaleFlame4PcOption];
export default paleFlameOptions;
