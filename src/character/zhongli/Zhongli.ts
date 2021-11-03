import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import zhongliTalents from './ZhongliTalent';
import zhongliTeamOptions from './ZhongliTeamOption';

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

  getTeamOptionConstructors(): typeof CharacterOption[] {
    return zhongliTeamOptions;
  }
}
