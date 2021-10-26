import {
  getArtifactSetBonusData,
  getArtifactSetBonusParams,
} from '../../data/Data';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';
import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { IOptionNumber, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';

export default class CrimsonWitch extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [crimsonWitch4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('crimsonwitchofflames', 4);

class CrimsonWitch4PcOption
  extends ArtifactSetOption
  implements IOptionNumber, IStatsApplicable
{
  value = 0;

  constructor() {
    super('crimsonWitch4PcStacks', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value > 0) {
        const setBonusData = getArtifactSetBonusData('crimsonwitchofflames');
        const param = setBonusData[2].bonuses.find(
          ({ stat }) => stat === 'pyroDmgBonus'
        )?.value!!;

        let stacks = this.value;
        if (stacks > 3) stacks = 3;
        stats.pyroDmgBonus = stacks * (param / 2) + (stats.pyroDmgBonus ?? 0);
      }
    },
  };
}

const crimsonWitch4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [CrimsonWitch4PcOption],

  extraStats: [
    {
      stat: 'overloadDmgBonus',
      value: params4Pc[0],
    },
    {
      stat: 'burningDmgBonus',
      value: params4Pc[0],
    },
    {
      stat: 'vaporizeDmgBonus',
      value: params4Pc[1],
    },
    {
      stat: 'meltDmgBonus',
      value: params4Pc[2],
    },
  ],
};
