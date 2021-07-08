import CharacterOption from './CharacterOption';
import { getTalentStatsAt, getTalentData } from '../../Data';
import DamageModifier from '../../modifier/DamageModifer';
import { Element, TalentType } from '../../talent/types';
import {
  IOptionBoolean,
  IStatsApplicable,
  IModifierApplicable,
} from '../Option';
import { Stats } from '../../../data/types';

class HuTaoOptionSkill
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable, IModifierApplicable
{
  value = false;

  constructor() {
    super('paramitaPapilioState');
  }

  applyOnStats(
    stats: Stats,
    _talentAttackLevel: number,
    talentSkillLevel: number,
    _talentBurstLevel: number
  ) {
    if (this.value) {
      let skillParams = getTalentStatsAt(
        TalentType.Skill,
        talentSkillLevel,
        getTalentData('hutao')
      );
      stats.flatAtk += skillParams[1] * stats.flatHp;
    }
  }

  applyOnModifier(modifier: DamageModifier) {
    if (this.value) {
      modifier.infusion = Element.Pyro;
    }
  }
}

const hutaoOptions = [HuTaoOptionSkill];
export default hutaoOptions;
