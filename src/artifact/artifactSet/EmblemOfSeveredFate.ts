import { getArtifactSetBonusParams } from '../../data/Data';
import { Stats } from '../../data/types';
import { Priority } from '../../option/Mixin';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class EmblemOfSeveredFate extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [emblemOfSeveredFate4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('emblemofseveredfate', 4);

const emblemOfSeveredFate4Pc: ArtifactSetBonus = {
  pieces: 4,

  statMixin: {
    priority: Priority.Last,
    apply: (stats: Stats) => {
      let burstDmgBonus = params4Pc[0] * stats.energyRecharge;
      if (burstDmgBonus > params4Pc[1]) {
        burstDmgBonus = params4Pc[1];
      }

      stats.burstDmgBonus = burstDmgBonus + (stats.burstDmgBonus ?? 0);
    },
  },
};
