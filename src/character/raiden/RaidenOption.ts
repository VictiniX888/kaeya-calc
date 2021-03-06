import { Stats } from '../../data/types';
import { getTalentParams, getTalentData } from '../../data/Data';
import DamageModifier from '../../modifier/DamageModifer';
import { TalentType } from '../../talent/types';
import {
  IModifierApplicable,
  IOptionBoolean,
  IOptionNumber,
  IStatsApplicable,
} from '../../option/Option';
import CharacterOption from '../../option/characterOptions/CharacterOption';

class RaidenOptionSkill
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('raidenSkill');
  }

  statMixin = {
    apply: (
      stats: Stats,
      _talentAttackLevel: number,
      talentSkillLevel: number,
      _talentBurstLevel: number
    ) => {
      if (this.value) {
        const params = getTalentParams(
          TalentType.Skill,
          talentSkillLevel,
          getTalentData('raiden')
        );

        const burstDmgBonus = params[3] * 90;
        stats.burstDmgBonus = burstDmgBonus + (stats.burstDmgBonus ?? 0);
      }
    },
  };
}

class RaidenOptionResolve
  extends CharacterOption
  implements IOptionNumber, IModifierApplicable
{
  value = 0;

  constructor() {
    super('resolve');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value < 0) modifier.resolveStacks = 0;
      else if (this.value > 60) modifier.resolveStacks = 60;
      else modifier.resolveStacks = this.value;
    },
  };
}

const raidenOptions = [RaidenOptionSkill, RaidenOptionResolve];
export default raidenOptions;
