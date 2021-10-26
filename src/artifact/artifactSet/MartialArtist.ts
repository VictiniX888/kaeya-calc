import { getArtifactSetBonusParams } from '../../data/Data';
import { Stats } from '../../data/types';
import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class MartialArtist extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [martialArtist2Pc, martialArtist4Pc];
  }
}

const params2Pc = getArtifactSetBonusParams('martialartist', 2);

const martialArtist2Pc: ArtifactSetBonus = {
  pieces: 2,

  extraStats: [
    {
      stat: 'normalDmgBonus',
      value: params2Pc[0],
    },
    {
      stat: 'chargedDmgBonus',
      value: params2Pc[0],
    },
  ],
};

const params4Pc = getArtifactSetBonusParams('martialartist', 4);

class MartialArtist4PcOption
  extends ArtifactSetOption
  implements IOptionBoolean, IStatsApplicable
{
  value = true;

  constructor() {
    super('martialArtist4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.normalDmgBonus = params4Pc[2] + (stats.normalDmgBonus ?? 0);
        stats.chargedDmgBonus = params4Pc[2] + (stats.chargedDmgBonus ?? 0);
      }
    },
  };
}

const martialArtist4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [MartialArtist4PcOption],
};
