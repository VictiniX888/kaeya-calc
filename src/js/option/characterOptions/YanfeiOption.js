import CharacterOption from './CharacterOption';
import { getTalentStatsAt, getTalentData } from '../../Data';

const yanfeiOptionBurst = new CharacterOption({
  id: 'brilliance',
  type: 'boolean',
  initialValue: false,

  applyOnStats: (stats, value, { talentBurstLevel }) => {
    if (value === true) {
      const burstParams = getTalentStatsAt(
        'burst',
        talentBurstLevel,
        getTalentData('yanfei')
      );
      stats.chargedDmgBonus = burstParams[1] + (stats.chargedDmgBonus ?? 0);
    }
  },
});

const yanfeiOptions = [yanfeiOptionBurst];
export default yanfeiOptions;
