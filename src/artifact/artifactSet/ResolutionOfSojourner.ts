import { getArtifactSetBonusParams } from '../../data/Data';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class ResolutionOfSojourner extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [resolutionOfSojourner4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('resolutionofsojourner', 4);

const resolutionOfSojourner4Pc: ArtifactSetBonus = {
  pieces: 4,

  extraStats: [
    {
      stat: 'chargedCritRate',
      value: params4Pc[0],
    },
  ],
};
