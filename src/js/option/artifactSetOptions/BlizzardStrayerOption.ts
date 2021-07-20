import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class BlizzardStrayer4PcCryoOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('blizzardStrayer4PcCryo', 4);
  }

  applyOnStats(stats: Stats) {
    if (this.value) {
      const params = getArtifactSetBonusParams('blizzardstrayer', 4);
      stats.critRate = params[0] + (stats.critRate ?? 0);
    }
  }
}

class BlizzardStrayer4PcFrozenOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('blizzardStrayer4PcFrozen', 4);
  }

  applyOnStats(stats: Stats) {
    if (this.value) {
      const params = getArtifactSetBonusParams('blizzardstrayer', 4);
      stats.critRate = params[1] + (stats.critRate ?? 0);
    }
  }
}

const blizzardStrayerOptions = [
  BlizzardStrayer4PcCryoOption,
  BlizzardStrayer4PcFrozenOption,
];
export default blizzardStrayerOptions;
