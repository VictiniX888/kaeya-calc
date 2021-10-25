import CharacterOption from '../../option/characterOptions/CharacterOption';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { Stats } from '../../data/types';
import { getTalentStatsAt, getTalentData } from '../../data/Data';
import { TalentType } from '../../talent/types';

class MonaOptionOmen
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('omen');
  }

  statMixin = {
    apply: (
      stats: Stats,
      _talentAttackLevel: number,
      _talentSkillLevel: number,
      talentBurstLevel: number
    ) => {
      if (this.value) {
        const burstParams = getTalentStatsAt(
          TalentType.Burst,
          talentBurstLevel,
          getTalentData('mona')
        );

        stats.dmgBonus = burstParams[9] + (stats.dmgBonus ?? 0);
      }
    },
  };
}

const monaOptions = [MonaOptionOmen];
export default monaOptions;
