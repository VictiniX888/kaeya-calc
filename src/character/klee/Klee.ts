import { Talents } from '../../talent/types';
import Character from '../Character';
import kleeTalents from './KleeTalent';

export default class Klee extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('klee', level, hasAscended);
  }

  getTalentFns(): Talents {
    return kleeTalents;
  }
}
