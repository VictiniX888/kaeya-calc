import CharacterOption from './CharacterOption';
import { getTalentStatsAt, getTalentData } from '../../Data';
import { IOptionBoolean, IStatsApplicable } from '../Option';
import { Stats } from '../../../data/types';
import { TalentType } from '../../talent/types';

class YanfeiOptionBurst
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('brilliance');
  }

  applyOnStats(
    stats: Stats,
    _talentAttackLevel: number,
    _talentSkillLevel: number,
    talentBurstLevel: number
  ) {
    if (this.value) {
      const burstParams = getTalentStatsAt(
        TalentType.Burst,
        talentBurstLevel,
        getTalentData('yanfei')
      );
      stats.chargedDmgBonus = burstParams[1] + (stats.chargedDmgBonus ?? 0);
    }
  }
}

const yanfeiOptions = [YanfeiOptionBurst];
export default yanfeiOptions;
