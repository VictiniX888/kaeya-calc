import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusParams } from '../../Data.js';

const bloodstainedChivalry4PcOption = new ArtifactSetOption({
  id: 'bloodstainedChivalry4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('bloodstainedchivalry', 4);
      stats.chargedDmgBonus = params[1] + (stats.chargedDmgBonus ?? 0);
    }
  },
});

export default [bloodstainedChivalry4PcOption];
