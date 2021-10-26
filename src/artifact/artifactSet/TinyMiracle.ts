import { getArtifactSetBonusParams } from '../../data/Data';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';

export default class TinyMiracle extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [tinyMiracle2Pc];
  }
}

const params2Pc = getArtifactSetBonusParams('tinymiracle', 2);

const tinyMiracle2Pc: ArtifactSetBonus = {
  pieces: 2,

  extraStats: ['anemo', 'cryo', 'electro', 'geo', 'hydro', 'pyro'].map(
    (element) => {
      return {
        stat: `${element}Res`,
        value: params2Pc[0],
      };
    }
  ),
};
