import CharacterOption from './CharacterOption.js';
import { getTalentStatsAt, getTalentData } from '../../Data.js';

const noelleOptionBurst = new CharacterOption({
  id: 'noelleBurst',
  type: 'boolean',
  initialValue: false,

  applyOnStats: (stats, value, { talentBurstLevel }) => {
    if (value === true) {
      let burstParams = getTalentStatsAt(
        'burst',
        talentBurstLevel,
        getTalentData('noelle')
      );

      const totalDef =
        (stats.baseDef ?? 0) * (1 + (stats.defBonus ?? 0)) +
        (stats.flatDef ?? 0);

      stats.flatAtk = (stats.flatAtk ?? 0) + totalDef * burstParams[2];
    }
  },

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = 'geo';
    }
  },
});

export default [noelleOptionBurst];
