import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../data/Data';
import { IOptionPicker, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import { ArtifactSetBonus } from '../types';
import ArtifactSet from '../ArtifactSet';

export default class ArchaicPetra extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [archaicPetra4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('archaicpetra', 4);

export class ArchaicPetra4PcOption
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
        stats[`${this.value}DmgBonus`] =
          params4Pc[0] + (stats[`${this.value}DmgBonus`] ?? 0);
      }
    },
  };
}

const archaicPetra4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [ArchaicPetra4PcOption],
};
