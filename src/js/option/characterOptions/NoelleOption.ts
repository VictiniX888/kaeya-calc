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

class NoelleOptionBurst
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable, IModifierApplicable
{
  value = false;

  constructor() {
    super('noelleBurst');
  }

  applyOnStats(
    stats: Stats,
    _talentAttackLevel: number,
    _talentSkillLevel: number,
    talentBurstLevel: number
  ) {
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
  }

  applyOnModifier(modifier: DamageModifier) {
    if (this.value) {
      modifier.infusion = Element.Geo;
    }
  }
}

const noelleOptions = [NoelleOptionBurst];
export default noelleOptions;
