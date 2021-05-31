import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusParams } from '../../Data.js';

const viridescentVenerer4PcOption = new ArtifactSetOption({
  id: 'viridescentVenerer4Pc',
  type: 'picker',
  initialValue: true,
  choices: ['cryo', 'electro', 'hydro', 'pyro'],
  threshold: 4,

  applyOnModifier: (modifier, value) => {
    const params = getArtifactSetBonusParams('viridescentvenerer', 4);
    modifier.enemyResReduction.set(value, params[1] * 100);
  },
});

export default [viridescentVenerer4PcOption];
