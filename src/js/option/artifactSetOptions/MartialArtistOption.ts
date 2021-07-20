import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class MartialArtist4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('martialArtist4Pc', 4);
  }

  applyOnStats(stats: Stats) {
    if (this.value) {
      const params = getArtifactSetBonusParams('martialartist', 4);
      stats.normalDmgBonus = params[2] + (stats.normalDmgBonus ?? 0);
      stats.chargedDmgBonus = params[2] + (stats.chargedDmgBonus ?? 0);
    }
  }
}

const martialArtistOptions = [MartialArtist4PcOption];
export default martialArtistOptions;
