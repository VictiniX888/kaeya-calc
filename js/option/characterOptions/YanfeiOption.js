import Option from '../Option.js';
import { getTalentStatsAt, getTalentData } from '../../Data.js';

const yanfeiOptionBurst = new Option({
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

export default [yanfeiOptionBurst];
