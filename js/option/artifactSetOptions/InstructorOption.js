import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusParams } from '../../Data.js';

const instructor4PcOption = new ArtifactSetOption({
  id: 'instructor4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('instructor', 4);
      stats.elementalMastery = params[1] + (stats.elementalMastery ?? 0);
    }
  },
});

export default [instructor4PcOption];
