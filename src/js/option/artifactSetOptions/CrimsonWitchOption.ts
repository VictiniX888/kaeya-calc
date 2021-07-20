import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusData } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class CrimsonWitch4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('crimsonWitch4Pc', 4);
  }

  applyOnStats(stats: Stats) {
    if (this.value) {
      const setBonusData = getArtifactSetBonusData('crimsonwitchofflames');
      const param = setBonusData[2].bonuses.find(
        ({ stat }) => stat === 'pyroDmgBonus'
      )?.value!!;

      stats.pyroDmgBonus = param / 2 + (stats.pyroDmgBonus ?? 0);
    }
  }
}

const crimsonWitchOptions = [CrimsonWitch4PcOption];
export default crimsonWitchOptions;
