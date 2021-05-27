import Option from '../Option.js';
import { getTalentStatsAt, getTalentData } from '../../Data.js';

const xiaoOptionBurst = new Option({
  id: 'xiaoBurst',
  type: 'boolean',
  value: false,

  applyOnStats: (stats, value, _1, _2, talentBurstLevel) => {
    if (value === true) {
      let burstParams = getTalentStatsAt(
        'burst',
        talentBurstLevel,
        getTalentData('xiao')
      );

      stats.normalDmgBonus = burstParams[0] + (stats.normalDmgBonus ?? 0);
      stats.chargedDmgBonus = burstParams[0] + (stats.chargedDmgBonus ?? 0);
      stats.plungeDmgBonus = burstParams[0] + (stats.plungeDmgBonus ?? 0);
    }
  },

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = 'anemo';
    }
  },
});

export default [xiaoOptionBurst];
