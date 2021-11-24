import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionNumber, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import { ArtifactSetBonus } from '../types';
import ArtifactSet from '../ArtifactSet';

export default class HuskOfOpulentDreams extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [huskOfOpulentDreams4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('huskofopulentdreams', 4);

class HuskOfOpulentDreams4PcOption
  extends ArtifactSetOption
  implements IOptionNumber, IStatsApplicable
{
  value = 0;

  constructor() {
    super('huskOfOpulentDreams4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value > 0) {
        let stacks = this.value;
        if (stacks > 4) {
          stacks = 4;
        }

        stats.defBonus = params4Pc[2] * stacks + (stats.defBonus ?? 0);
        stats.geoDmgBonus = params4Pc[3] * stacks + (stats.geoDmgBonus ?? 0);
      }
    },
  };
}

const huskOfOpulentDreams4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [HuskOfOpulentDreams4PcOption],
};
