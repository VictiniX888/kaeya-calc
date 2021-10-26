import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class MaidenBeloved extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [maidenBeloved4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('maidenbeloved', 4);

class MaidenBeloved4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('maidenBeloved4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.healedBonus = params4Pc[0] + (stats.healedBonus ?? 0);
      }
    },
  };
}

const maidenBeloved4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [MaidenBeloved4PcOption],
};
