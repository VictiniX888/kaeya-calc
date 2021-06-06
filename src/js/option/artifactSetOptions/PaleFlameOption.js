import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';

const paleFlame4PcOption = new ArtifactSetOption({
  id: 'paleFlame4Pc',
  type: 'number',
  initialValue: 0,
  threshold: 4,

  applyOnStats: (stats, value) => {
    const params = getArtifactSetBonusParams('paleflame', 4);

    if (value >= 1) {
      stats.atkBonus = params[0] + (stats.atkBonus ?? 0);
    }

    if (value >= 2) {
      stats.atkBonus = params[0] + (stats.atkBonus ?? 0);
      stats.physicalDmgBonus = params[3] + (stats.physicalDmgBonus ?? 0);
    }
  },
});

const paleFlameOptions = [paleFlame4PcOption];
export default paleFlameOptions;
