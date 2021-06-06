import CharacterOption from './CharacterOption';
import { getTalentStatsAt, getTalentData } from '../../Data';

const hutaoOptionSkill = new CharacterOption({
  id: 'paramitaPapilioState',
  type: 'boolean',
  initialValue: false,

  applyOnStats: (stats, value, { talentSkillLevel }) => {
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

const hutaoOptions = [hutaoOptionSkill];
export default hutaoOptions;
