import { Stats } from '../../data/types';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class Shimenawa extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [shimenawa4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('shimenawasreminiscence', 4);

class Shimenawa4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('shimenawa4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        const param = params4Pc[1];
        stats.normalDmgBonus = param + (stats.normalDmgBonus ?? 0);
        stats.chargedDmgBonus = param + (stats.chargedDmgBonus ?? 0);
        stats.plungeDmgBonus = param + (stats.plungeDmgBonus ?? 0);
      }
    },
  };
}

const shimenawa4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [Shimenawa4PcOption],
};
