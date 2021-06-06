import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';

const maidenBeloved4PcOption = new ArtifactSetOption({
  id: 'maidenBeloved4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('maidenbeloved', 4);
      stats.healedBonus = params[0] + (stats.healedBonus ?? 0);
    }
  },
});

export default [maidenBeloved4PcOption];
