import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusData } from '../../Data.js';

const crimsonWitch4PcOption = new ArtifactSetOption({
  id: 'crimsonWitch4Pc',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const setBonusData = getArtifactSetBonusData('crimsonwitchofflames');
      const param = setBonusData[2].bonuses.find(
        ({ stat }) => stat === 'pyroDmgBonus'
      ).value;

      stats.pyroDmgBonus = param / 2 + (stats.pyroDmgBonus ?? 0);
    }
  },
});

export default [crimsonWitch4PcOption];
