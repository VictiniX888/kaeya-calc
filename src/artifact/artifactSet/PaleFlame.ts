import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionNumber, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class PaleFlame extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [paleFlame4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('paleflame', 4);

class PaleFlame4PcOption
  extends ArtifactSetOption
  implements IOptionNumber, IStatsApplicable
{
  value = 0;

  constructor() {
    super('paleFlame4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value >= 1) {
        stats.atkBonus = params4Pc[0] + (stats.atkBonus ?? 0);
      }

      if (this.value >= 2) {
        stats.atkBonus = params4Pc[0] + (stats.atkBonus ?? 0);
        stats.physicalDmgBonus = params4Pc[3] + (stats.physicalDmgBonus ?? 0);
      }
    },
  };
}

const paleFlame4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [PaleFlame4PcOption],
};
