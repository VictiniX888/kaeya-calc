import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class Instructor4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('instructor4Pc', 4);
  }

  applyOnStats(stats: Stats) {
    if (this.value) {
      const params = getArtifactSetBonusParams('instructor', 4);
      stats.elementalMastery = params[1] + (stats.elementalMastery ?? 0);
    }
  }
}

const instructorOptions = [Instructor4PcOption];
export default instructorOptions;
