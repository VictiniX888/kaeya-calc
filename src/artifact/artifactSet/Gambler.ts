import { getArtifactSetBonusParams } from '../../data/Data';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class Gambler extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [gambler2Pc];
  }
}

const params2Pc = getArtifactSetBonusParams('gambler', 2);

const gambler2Pc: ArtifactSetBonus = {
  pieces: 2,

  extraStats: [
    {
      stat: 'skillDmgBonus',
      value: params2Pc[0],
    },
  ],
};
