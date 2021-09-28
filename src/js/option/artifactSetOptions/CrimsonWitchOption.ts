import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusData } from '../../Data';
import { IOptionNumber, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class CrimsonWitch4PcOption
  extends ArtifactSetOption
  implements IOptionNumber, IStatsApplicable
{
  value = 0;

  constructor() {
    super('crimsonWitch4PcStacks', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value > 0) {
        const setBonusData = getArtifactSetBonusData('crimsonwitchofflames');
        const param = setBonusData[2].bonuses.find(
          ({ stat }) => stat === 'pyroDmgBonus'
        )?.value!!;

        let stacks = this.value;
        if (stacks > 3) stacks = 3;
        stats.pyroDmgBonus = stacks * (param / 2) + (stats.pyroDmgBonus ?? 0);
      }
    },
  };
}

const crimsonWitchOptions = [CrimsonWitch4PcOption];
export default crimsonWitchOptions;
