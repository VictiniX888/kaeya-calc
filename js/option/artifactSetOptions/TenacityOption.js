import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusParams } from '../../Data.js';

const tenacity4PcOption = new ArtifactSetOption({
  id: 'tenacity4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('tenacityofthemillelith', 4);
      stats.atkBonus = params[0] + (stats.atkBonus ?? 0);
      stats.shieldStrength = params[1] + (stats.shieldStrength ?? 0);
    }
  },
});

export default [tenacity4PcOption];
