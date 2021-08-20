import { Stats } from '../../../data/types';
import { getTalentData } from '../../Data';
import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import {
  IModifierApplicable,
  IOptionBoolean,
  IStatsApplicable,
} from '../Option';
import CharacterOption from './CharacterOption';

class DilucOptionInfusion
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable, IStatsApplicable
{
  value = false;

  constructor() {
    super('dilucBurst');
  }

  applyOnModifier = (modifier: DamageModifier) => {
    if (this.value) {
      modifier.infusion = Element.Pyro;
    }
  };

  applyOnStats = (
    stats: Stats,
    _talentAttackLevel: number,
    _talentSkillLevel: number,
    _talentBurstLevel: number,
    ascensionLevel: number
  ) => {
    if (this.value && ascensionLevel >= 4) {
      const params = getTalentData('diluc').passives.find(
        (passiveData) => passiveData.id === 'Diluc_PermanentSkill_2'
      )?.params;
      const pyroDmgBonus = params?.[1] ?? NaN;

      stats.pyroDmgBonus = pyroDmgBonus + (stats.pyroDmgBonus ?? 0);
    }
  };
}

const dilucOptions: typeof CharacterOption[] = [DilucOptionInfusion];
export default dilucOptions;
