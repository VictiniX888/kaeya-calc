import Option from '../Option.js';
import { getTalentStatsAt, getTalentData } from '../../Data.js';

const noelleOptionBurst = new Option({
  id: 'noelleBurst',
  type: 'boolean',
  value: false,

  applyOnStats: (stats, value, _1, _2, talentBurstLevel) => {
    if (value === true) {
      let burstParams = getTalentStatsAt(
        'burst',
        talentBurstLevel,
        getTalentData('noelle')
      );

      stats.flatAtk = stats.flatAtk + stats.flatDef * burstParams[2];
    }
  },

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = 'geo';
    }
  },
});

export default [noelleOptionBurst];
