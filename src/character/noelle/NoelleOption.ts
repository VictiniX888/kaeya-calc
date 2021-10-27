import CharacterOption from '../../option/characterOptions/CharacterOption';
import { getTalentStatsAt, getTalentData } from '../../data/Data';
import DamageModifier from '../../modifier/DamageModifer';
import { Element, TalentType } from '../../talent/types';
import {
  IOptionBoolean,
  IStatsApplicable,
  IModifierApplicable,
} from '../../option/Option';
import { Stats } from '../../data/types';
import { Priority } from '../../option/Mixin';

class NoelleOptionBurst
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable, IModifierApplicable
{
  value = false;

  constructor() {
    super('noelleBurst');
  }

  statMixin = {
    priority: Priority.Last,
    apply: (
      stats: Stats,
      _talentAttackLevel: number,
      _talentSkillLevel: number,
      talentBurstLevel: number
    ) => {
      if (this.value) {
        let burstParams = getTalentStatsAt(
          TalentType.Burst,
          talentBurstLevel,
          getTalentData('noelle')
        );

        const totalDef =
          (stats.baseDef ?? 0) * (1 + (stats.defBonus ?? 0)) +
          (stats.flatDef ?? 0);

        stats.flatAtk = (stats.flatAtk ?? 0) + totalDef * burstParams[2];
      }
    },
  };

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.infusion = Element.Geo;
      }
    },
  };
}

const noelleOptions = [NoelleOptionBurst];
export default noelleOptions;
