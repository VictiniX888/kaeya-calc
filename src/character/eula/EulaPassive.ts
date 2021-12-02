import { getTalentData, getTalentParams } from '../../data/Data';
import { CharacterPassive } from '../../passive/types';
import { burstSingle } from '../../talent/TalentUtil';
import { Element, TalentProps, Talents, TalentType } from '../../talent/types';
import { getEulaLightfallSwordStats } from './EulaTalent';

const talentData = getTalentData('eula');
const [{ params: a1Params }] = talentData.passives;

const eulaA1Talents: Talents = {
  ascension1: {
    lightfallSwordRemnantDmg: ({ stats, modifier }: TalentProps) =>
      burstSingle({
        element: Element.Physical,
        multiplier:
          getTalentParams(
            TalentType.Burst,
            modifier.talentBurstLevel,
            talentData
          )[1] * a1Params[0],
        stats: getEulaLightfallSwordStats(stats, modifier),
        modifier,
      }),
  },
};

const eulaAscension1: CharacterPassive = {
  id: 'eulaAscension1',
  ascensionLevel: 1,
  options: [],
  talents: eulaA1Talents,
};

const eulaPassives = [eulaAscension1];
export default eulaPassives;
