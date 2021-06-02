import ArtifactSetOption from './ArtifactSetOption.js';
import { getArtifactSetBonusParams } from '../../Data.js';

const blizzardStrayer4PcCryoOption = new ArtifactSetOption({
  id: 'blizzardStrayer4PcCryo',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('blizzardstrayer', 4);
      stats.critRate = params[0] + (stats.critRate ?? 0);
    }
  },
});

const blizzardStrayer4PcFrozenOption = new ArtifactSetOption({
  id: 'blizzardStrayer4PcFrozen',
  type: 'boolean',
  initialValue: true,
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value === true) {
      const params = getArtifactSetBonusParams('blizzardstrayer', 4);
      stats.critRate = params[1] + (stats.critRate ?? 0);
    }
  },
});

export default [blizzardStrayer4PcCryoOption, blizzardStrayer4PcFrozenOption];
