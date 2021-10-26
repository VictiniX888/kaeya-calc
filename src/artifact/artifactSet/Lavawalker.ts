import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class Lavawalker extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [lavawalker4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('lavawalker', 4);

class Lavawalker4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('lavawalker4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.dmgBonus = params4Pc[0] + (stats.dmgBonus ?? 0);
      }
    },
  };
}

const lavawalker4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [Lavawalker4PcOption],
};
