import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Stats } from '../../data/types';
import { getTalentData, getTalentParams } from '../../data/Data';
import DamageModifier from '../../modifier/DamageModifer';
import { Element, TalentType } from '../../talent/types';
import {
  IOptionNumber,
  IStatsApplicable,
  IModifierApplicable,
} from '../../option/Option';

class AloyOptionCoil
  extends CharacterOption
  implements IOptionNumber, IStatsApplicable, IModifierApplicable
{
  value = 0;

  constructor() {
    super('coil');
  }

  statMixin = {
    apply: (
      stats: Stats,
      _talentAttackLevel: number,
      talentSkillLevel: number,
      _talentBurstLevel: number
    ) => {
      if (this.value > 0) {
        const skillParams = getTalentParams(
          TalentType.Skill,
          talentSkillLevel,
          getTalentData('aloy')
        );

        if (this.value >= 4) {
          // Rushing Ice state
          stats.normalDmgBonus = skillParams[7] + (stats.normalDmgBonus ?? 0);
        } else {
          stats.normalDmgBonus =
            skillParams[this.value + 3] + (stats.normalDmgBonus ?? 0);
        }
      }
    },
  };

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value >= 4) {
        modifier.infusionNormal = Element.Cryo;
      }
    },
  };
}

const aloyOptions = [AloyOptionCoil];
export default aloyOptions;
