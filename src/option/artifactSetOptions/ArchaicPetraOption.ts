import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionPicker, IStatsApplicable } from '../Option';
import { Stats } from '../../data/types';

class ArchaicPetra4PcOption
  extends ArtifactSetOption
  implements IOptionPicker, IStatsApplicable
{
  value = '';
  choices = ['cryo', 'electro', 'hydro', 'pyro'];

  constructor() {
    super('archaicPetra4Pc', 4);
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value !== '') {
        const params = getArtifactSetBonusParams('archaicpetra', 4);
        stats[`${this.value}DmgBonus`] =
          params[0] + (stats[`${this.value}DmgBonus`] ?? 0);
      }
    },
  };
}

const archaicPetraOptions = [ArchaicPetra4PcOption];
export default archaicPetraOptions;
