import CharacterOption from '../../option/characterOptions/CharacterOption';
import { getTalentParams, getTalentData } from '../../data/Data';
import {
  IModifierApplicable,
  IOptionBoolean,
  IStatsApplicable,
} from '../../option/Option';
import { Stats } from '../../data/types';
import { Element, TalentType } from '../../talent/types';
import DamageModifier from '../../modifier/DamageModifer';

class XiaoOptionBurst
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable, IModifierApplicable
{
  value = false;

  constructor() {
    super('xiaoBurst');
  }

  statMixin = {
    apply: (
      stats: Stats,
      _talentAttackLevel: number,
      _talentSkillLevel: number,
      talentBurstLevel: number
    ) => {
      if (this.value) {
        let burstParams = getTalentParams(
          TalentType.Burst,
          talentBurstLevel,
          getTalentData('xiao')
        );

        stats.normalDmgBonus = burstParams[0] + (stats.normalDmgBonus ?? 0);
        stats.chargedDmgBonus = burstParams[0] + (stats.chargedDmgBonus ?? 0);
        stats.plungeDmgBonus = burstParams[0] + (stats.plungeDmgBonus ?? 0);
      }
    },
  };

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.infusion = Element.Anemo;
      }
    },
  };
}

const xiaoOptions = [XiaoOptionBurst];
export default xiaoOptions;
