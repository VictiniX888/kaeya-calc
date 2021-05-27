import Option from '../Option.js';
import { getTalentStatsAt, getTalentData } from '../../Data.js';

const yanfeiOptionBurst = new Option({
  id: 'brilliance',
  type: 'boolean',
  value: false,

  applyOnStats: (stats, value, _1, _2, talentBurstLevel) => {
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
