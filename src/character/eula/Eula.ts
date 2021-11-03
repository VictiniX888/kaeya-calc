import { Talents } from '../../talent/types';
import Character from '../Character';
import eulaTalents from './EulaTalent';

export default class Eula extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('eula', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return eulaTalents;
  }
}
