import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusParams } from '../../Data.js';

const heartOfDepth4PcOption = new ArtifactSetOption({
  id: 'heartOfDepth4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('heartofdepth', 4);
      stats.normalDmgBonus = params[0] + (stats.normalDmgBonus ?? 0);
      stats.chargedDmgBonus = params[0] + (stats.chargedDmgBonus ?? 0);
    }
  },
});

export default [heartOfDepth4PcOption];
