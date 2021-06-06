import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';

const martialArtist4PcOption = new ArtifactSetOption({
  id: 'martialArtist4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('martialartist', 4);
      stats.normalDmgBonus = params[2] + (stats.normalDmgBonus ?? 0);
      stats.chargedDmgBonus = params[2] + (stats.chargedDmgBonus ?? 0);
    }
  },
});

const martialArtistOptions = [martialArtist4PcOption];
export default martialArtistOptions;
