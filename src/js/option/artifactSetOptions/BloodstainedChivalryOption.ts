import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';

class BloodStainedChivalry4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('bloodstainedChivalry4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        const params = getArtifactSetBonusParams('bloodstainedchivalry', 4);
        stats.chargedDmgBonus = params[1] + (stats.chargedDmgBonus ?? 0);
      }
    },
  };
}

const bloodstainedChivalryOptions = [BloodStainedChivalry4PcOption];
export default bloodstainedChivalryOptions;
