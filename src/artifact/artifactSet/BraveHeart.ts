import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class BraveHeart extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [braveHeart4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('braveheart', 4);

class BraveHeart4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('braveHeart4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.dmgBonus = params4Pc[0] + (stats.dmgBonus ?? 0);
      }
    },
  };
}

const braveHeart4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [BraveHeart4PcOption],
};
