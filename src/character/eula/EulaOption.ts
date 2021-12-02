import { getTalentData, getTalentParams } from '../../data/Data';
import { Stats } from '../../data/types';
import DamageModifier from '../../modifier/DamageModifer';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import {
  IModifierApplicable,
  IOptionBoolean,
  IOptionNumber,
  IStatsApplicable,
} from '../../option/Option';
import { Element, TalentType } from '../../talent/types';

class EulaOptionGrimheartStacks
  extends CharacterOption
  implements IOptionNumber, IStatsApplicable
{
  value = 0;

  constructor() {
    super('eulaGrimheartStacks');
  }

  statMixin = {
    apply: (
      stats: Stats,
      _talentAttackLevel: number,
      talentSkillLevel: number,
      _talentBurstLevel: number
    ) => {
      if (this.value > 0) {
        let stacks = this.value;
        if (stacks > 2) {
          stacks = 2;
        }

        const params = getTalentParams(
          TalentType.Skill,
          talentSkillLevel,
          getTalentData('eula')
        );

        stats.defBonus = params[8] * stacks + (stats.defBonus ?? 0);
      }
    },
  };
}

class EulaOptionBurstStacks
  extends CharacterOption
  implements IOptionNumber, IModifierApplicable
{
  value = 0;

  constructor() {
    super('eulaBurstStacks');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value > 0) {
        let stacks = this.value;
        if (stacks > 30) {
          stacks = 30;
        }

        modifier.eulaStacks = stacks;
      }
    },
  };
}

class EulaOptionGrimheartResDown
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('eulaGrimheartResDown');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        const params = getTalentParams(
          TalentType.Skill,
          modifier.talentSkillLevel,
          getTalentData('eula')
        );

        modifier.enemyResReduction.add(Element.Physical, -params[10]);
        modifier.enemyResReduction.add(Element.Cryo, -params[11]);
      }
    },
  };
}

const eulaOptions = [
  EulaOptionGrimheartStacks,
  EulaOptionBurstStacks,
  EulaOptionGrimheartResDown,
];
export default eulaOptions;
