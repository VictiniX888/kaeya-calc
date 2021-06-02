import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusParams } from '../../Data.js';

const thundersoother4PcOption = new ArtifactSetOption({
  id: 'thundersoother4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('thundersoother', 4);
      stats.dmgBonus = params[0] + (stats.dmgBonus ?? 0);
    }
  },
});

export default [thundersoother4PcOption];
