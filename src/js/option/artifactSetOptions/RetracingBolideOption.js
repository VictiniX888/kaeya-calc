import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';

const retracingBolide4PcOption = new ArtifactSetOption({
  id: 'retracingBolide4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('retracingbolide', 4);
      stats.normalDmgBonus = params[0] + (stats.normalDmgBonus ?? 0);
      stats.chargedDmgBonus = params[0] + (stats.chargedDmgBonus ?? 0);
    }
  },
});

export default [retracingBolide4PcOption];
