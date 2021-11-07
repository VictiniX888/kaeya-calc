import { getArtifactSetBonusParams } from '../../data/Data';
import { Stats } from '../../data/types';
import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class NoblesseOblige extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [noblesseOblige2Pc, noblesseOblige4Pc];
  }
}

const params2Pc = getArtifactSetBonusParams('noblesseoblige', 2);

const noblesseOblige2Pc: ArtifactSetBonus = {
  pieces: 2,

  extraStats: [
    {
      stat: 'burstDmgBonus',
      value: params2Pc[0],
    },
  ],
};

const params4Pc = getArtifactSetBonusParams('noblesseoblige', 4);

export class NoblesseOblige4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('noblesseOblige4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.atkBonus = params4Pc[0] + (stats.atkBonus ?? 0);
      }
    },
  };
}

const noblesseOblige4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [NoblesseOblige4PcOption],
};
