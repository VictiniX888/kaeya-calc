import { Talents } from '../../talent/types';
import Character from '../Character';
import kleeTalents from './KleeTalent';

export default class Klee extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('klee', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return kleeTalents;
  }
}
