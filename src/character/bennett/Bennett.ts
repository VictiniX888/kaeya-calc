import { TeamPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import bennettTalents from './BennettTalent';
import bennettTeamPassive from './BennettTeamPassive';

export default class Bennett extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('bennett', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return bennettTalents;
  }

  getTeamPassive(): TeamPassive {
    return bennettTeamPassive;
  }
}
