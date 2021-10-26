import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class Thundersoother extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [thundersoother4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('thundersoother', 4);

class Thundersoother4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('thundersoother4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.dmgBonus = params4Pc[0] + (stats.dmgBonus ?? 0);
      }
    },
  };
}

const thundersoother4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [Thundersoother4PcOption],
};
