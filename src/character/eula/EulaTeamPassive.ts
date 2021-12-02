import { getTalentData, getTalentParams } from '../../data/Data';
import DamageModifier from '../../modifier/DamageModifer';
import { getOptionValue } from '../../option';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import {
  IModifierApplicable,
  IOptionBoolean,
  IOptionNumber,
} from '../../option/Option';
import { TeamPassive } from '../../passive/types';
import { Element, TalentType } from '../../talent/types';

class EulaOptionSkillLevel extends CharacterOption implements IOptionNumber {
  value = 1;

  constructor() {
    super('eulaSkillLevel');
  }
}

class EulaOptionTeamGrimheartResDown
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('eulaGrimheartTeam', [EulaOptionSkillLevel]);
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        const params = getTalentParams(
          TalentType.Skill,
          getOptionValue(this.children[0]) as number,
          getTalentData('eula')
        );

        modifier.enemyResReduction.add(Element.Physical, -params[10]);
        modifier.enemyResReduction.add(Element.Cryo, -params[11]);
      }
    },
  };
}

const eulaTeamPassive: TeamPassive = {
  id: 'eulaTeamPassive',
  options: [EulaOptionTeamGrimheartResDown],
};
export default eulaTeamPassive;
