import CharacterOption from './CharacterOption';
import { getTalentStatsAt, getTalentData } from '../../Data';

const xiaoOptionBurst = new CharacterOption({
  id: 'xiaoBurst',
  type: 'boolean',
  initialValue: false,

  applyOnStats: (stats, value, { talentBurstLevel }) => {
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
