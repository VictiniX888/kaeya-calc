import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusParams } from '../../Data.js';

const noblesseOblige4PcOption = new ArtifactSetOption({
  id: 'noblesseOblige4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('noblesseoblige', 4);
      stats.atkBonus = params[0] + (stats.atkBonus ?? 0);
    }
  },
});

export default [noblesseOblige4PcOption];
