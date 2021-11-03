import { TeamPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import zhongliTalents from './ZhongliTalent';
import zhongliTeamPassive from './ZhongliTeamPassive';

export default class Zhongli extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('zhongli', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return zhongliTalents;
  }

  getTeamPassive(): TeamPassive {
    return zhongliTeamPassive;
  }
}
