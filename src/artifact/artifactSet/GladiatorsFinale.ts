import { getArtifactSetBonusParams } from '../../data/Data';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class GladiatorsFinale extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [gladiatorsFinale4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('gladiatorsfinale', 4);

const gladiatorsFinale4Pc: ArtifactSetBonus = {
  pieces: 4,

  // Only for sword, polearm, claymore characters
  // Did not make this an Option because this would likely not want to be disabled
  // Calculation will be wrong if used on a catalyst, bow character
  // Checking for that would require character weapon type to be implemented first
  extraStats: [
    {
      stat: 'normalDmgBonus',
      value: params4Pc[0],
    },
  ],
};
