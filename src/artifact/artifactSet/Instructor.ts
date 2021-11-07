import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class Instructor extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [instructor4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('instructor', 4);

export class Instructor4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('instructor4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.elementalMastery = params4Pc[1] + (stats.elementalMastery ?? 0);
      }
    },
  };
}

const instructor4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [Instructor4PcOption],
};
