import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../data/types';

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
        const params = getArtifactSetBonusParams('maidenbeloved', 4);
        stats.healedBonus = params[0] + (stats.healedBonus ?? 0);
      }
    },
  };
}

const maidenBelovedOptions = [MaidenBeloved4PcOption];
export default maidenBelovedOptions;
