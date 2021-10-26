import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import { ArtifactSetBonus } from '../types';
import ArtifactSet from '../ArtifactSet';

export default class RetracingBolide extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [retracingBolide4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('retracingbolide', 4);

class RetracingBolide4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('retracingBolide4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.normalDmgBonus = params4Pc[0] + (stats.normalDmgBonus ?? 0);
        stats.chargedDmgBonus = params4Pc[0] + (stats.chargedDmgBonus ?? 0);
      }
    },
  };
}

const retracingBolide4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [RetracingBolide4PcOption],
};
