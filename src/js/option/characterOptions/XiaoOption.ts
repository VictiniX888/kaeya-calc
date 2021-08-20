import CharacterOption from './CharacterOption';
import { getTalentStatsAt, getTalentData } from '../../Data';
import {
  IModifierApplicable,
  IOptionBoolean,
  IStatsApplicable,
} from '../Option';
import { Stats } from '../../../data/types';
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

  applyOnStats = (
    stats: Stats,
    _talentAttackLevel: number,
    _talentSkillLevel: number,
    talentBurstLevel: number
  ) => {
    if (this.value) {
      let burstParams = getTalentStatsAt(
        TalentType.Burst,
        talentBurstLevel,
        getTalentData('xiao')
      );

      stats.normalDmgBonus = burstParams[0] + (stats.normalDmgBonus ?? 0);
      stats.chargedDmgBonus = burstParams[0] + (stats.chargedDmgBonus ?? 0);
      stats.plungeDmgBonus = burstParams[0] + (stats.plungeDmgBonus ?? 0);
    }
  };

  applyOnModifier = (modifier: DamageModifier) => {
    if (this.value) {
      modifier.infusion = Element.Anemo;
    }
  };
}

const xiaoOptions = [XiaoOptionBurst];
export default xiaoOptions;
