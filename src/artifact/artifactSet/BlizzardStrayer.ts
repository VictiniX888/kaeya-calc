import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class BlizzardStrayer extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [blizzardStrayer4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('blizzardstrayer', 4);

class BlizzardStrayer4PcCryoOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('blizzardStrayer4PcCryo', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.critRate = params4Pc[0] + (stats.critRate ?? 0);
      }
    },
  };
}

class BlizzardStrayer4PcFrozenOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('blizzardStrayer4PcFrozen', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.critRate = params4Pc[1] + (stats.critRate ?? 0);
      }
    },
  };
}

const blizzardStrayer4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [BlizzardStrayer4PcCryoOption, BlizzardStrayer4PcFrozenOption],
};
