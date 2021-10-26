import { getArtifactSetBonusParams } from '../../data/Data';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class WanderersTroupe extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [wanderersTroupe4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('wandererstroupe', 4);

const wanderersTroupe4Pc: ArtifactSetBonus = {
  pieces: 4,

  // Only for catalyst, bow characters
  // See Gladiator's Finale for more details
  extraStats: [
    {
      stat: 'chargedDmgBonus',
      value: params4Pc[0],
    },
  ],
};
