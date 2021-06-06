import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';

const viridescentVenerer4PcOption = new ArtifactSetOption({
  id: 'viridescentVenerer4Pc',
  type: 'picker',
  initialValue: 'cryo',
  choices: ['cryo', 'electro', 'hydro', 'pyro'],
  threshold: 4,

  applyOnModifier: (modifier, value) => {
    const params = getArtifactSetBonusParams('viridescentvenerer', 4);
    modifier.enemyResReduction.add(value, params[1]);
  },
});

export default [viridescentVenerer4PcOption];
