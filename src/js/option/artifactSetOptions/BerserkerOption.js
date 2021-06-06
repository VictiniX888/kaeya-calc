import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';

const berserker4PcOption = new ArtifactSetOption({
  id: 'berserker4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('berserker', 4);
      stats.critRate = params[0] + (stats.critRate ?? 0);
    }
  },
});

export default [berserker4PcOption];
