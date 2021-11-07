import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class Tenacity extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [tenacity4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('tenacityofthemillelith', 4);

export class Tenacity4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('tenacity4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.atkBonus = params4Pc[0] + (stats.atkBonus ?? 0);
        stats.shieldStrength = params4Pc[1] + (stats.shieldStrength ?? 0);
      }
    },
  };
}

const tenacity4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [Tenacity4PcOption],
};
