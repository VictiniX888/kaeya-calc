import CharacterOption from '../../option/characterOptions/CharacterOption';
import { getTalentParams, getTalentData } from '../../data/Data';
import DamageModifier from '../../modifier/DamageModifer';
import { Element, TalentType } from '../../talent/types';
import {
  IOptionBoolean,
  IStatsApplicable,
  IModifierApplicable,
} from '../../option/Option';
import { Stats } from '../../data/types';
import { Priority } from '../../option/Mixin';

class HuTaoOptionSkill
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable, IModifierApplicable
{
  value = false;

  constructor() {
    super('paramitaPapilioState');
  }

  statMixin = {
    priority: Priority.Last,
    apply: (
      stats: Stats,
      _talentAttackLevel: number,
      talentSkillLevel: number,
      _talentBurstLevel: number
    ) => {
      if (this.value) {
        let skillParams = getTalentParams(
          TalentType.Skill,
          talentSkillLevel,
          getTalentData('hutao')
        );

        const totalHp =
          (stats.baseHp ?? 0) * (1 + (stats.hpBonus ?? 0)) +
          (stats.flatHp ?? 0);
        let flatAtkBonus = totalHp * skillParams[1];
        if (flatAtkBonus > stats.baseAtk * skillParams[6]) {
          flatAtkBonus = stats.baseAtk * skillParams[6];
        }

        stats.flatAtk = flatAtkBonus + (stats.flatAtk ?? 0);
      }
    },
  };

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.infusion = Element.Pyro;
      }
    },
  };
}

const hutaoOptions = [HuTaoOptionSkill];
export default hutaoOptions;
