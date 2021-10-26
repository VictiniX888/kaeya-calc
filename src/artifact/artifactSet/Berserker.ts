import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class Berserker extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [berserker4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('berserker', 4);

class Berserker4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('berserker4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.critRate = params4Pc[0] + (stats.critRate ?? 0);
      }
    },
  };
}

const berserker4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [Berserker4PcOption],
};
