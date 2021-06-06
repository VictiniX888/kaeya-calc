import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';

const archaicPetra4PcOption = new ArtifactSetOption({
  id: 'archaicPetra4Pc',
  type: 'picker',
  initialValue: '',
  choices: ['', 'cryo', 'electro', 'hydro', 'pyro'],
  threshold: 4,

  applyOnStats: (stats, value) => {
    if (value !== '') {
      const params = getArtifactSetBonusParams('archaicpetra', 4);
      stats[`${value}DmgBonus`] = params[0] + (stats[`${value}DmgBonus`] ?? 0);
    }
  },
});

export default [archaicPetra4PcOption];
