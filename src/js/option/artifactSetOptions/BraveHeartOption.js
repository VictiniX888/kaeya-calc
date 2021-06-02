import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusParams } from '../../Data.js';

const braveHeart4PcOption = new ArtifactSetOption({
  id: 'braveHeart4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('braveheart', 4);
      stats.dmgBonus = params[0] + (stats.dmgBonus ?? 0);
    }
  },
});

export default [braveHeart4PcOption];
