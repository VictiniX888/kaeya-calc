import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class HeartOfDepth extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [heartOfDepth4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('heartofdepth', 4);

class HeartOfDepth4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('heartOfDepth4Pc', 4);
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

const heartOfDepth4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [HeartOfDepth4PcOption],
};
