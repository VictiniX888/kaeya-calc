import { Stats } from '../../../data/types';
import { getArtifactSetBonusData } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import ArtifactSetOption from './ArtifactSetOption';

class Shimenawa4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('shimenawa4Pc', 4);
  }

  applyOnStats(stats: Stats) {
    if (this.value) {
      const setBonusData = getArtifactSetBonusData('shimenawasreminiscence');
      const param = setBonusData[4].bonusExtra.params[1];
      stats.normalDmgBonus = param + (stats.normalDmgBonus ?? 0);
      stats.chargedDmgBonus = param + (stats.chargedDmgBonus ?? 0);
      stats.plungeDmgBonus = param + (stats.plungeDmgBonus ?? 0);
    }
  }
}

const shimenawaOptions = [Shimenawa4PcOption];
export default shimenawaOptions;
