import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class BloodstainedChivalry extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [bloodstainedChivalry4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('bloodstainedchivalry', 4);

class BloodstainedChivalry4PcOption
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
        stats.chargedDmgBonus = params4Pc[1] + (stats.chargedDmgBonus ?? 0);
      }
    },
  };
}

const bloodstainedChivalry4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [BloodstainedChivalry4PcOption],
};
