import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';

const lavawalker4PcOption = new ArtifactSetOption({
  id: 'lavawalker4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('lavawalker', 4);
      stats.dmgBonus = params[0] + (stats.dmgBonus ?? 0);
    }
  },
});

const lavawalkerOptions = [lavawalker4PcOption];
export default lavawalkerOptions;
