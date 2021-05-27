import Option from '../Option.js';
import { getTalentStatsAt, getTalentData } from '../../Data.js';

const hutaoOptionSkill = new Option({
  id: 'paramitaPapilioState',
  type: 'boolean',
  value: false,

  applyOnStats: (stats, value, _, talentSkillLevel) => {
    if (value === true) {
      let skillParams = getTalentStatsAt(
        'skill',
        talentSkillLevel,
        getTalentData('hutao')
      );
      stats.flatAtk += skillParams[1] * stats.flatHp;
    }
  },

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = 'pyro';
    }
  },
});

export default [hutaoOptionSkill];
