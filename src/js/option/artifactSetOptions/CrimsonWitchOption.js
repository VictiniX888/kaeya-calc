import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusData } from '../../Data';

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

const crimsonWitchOptions = [crimsonWitch4PcOption];
export default crimsonWitchOptions;
