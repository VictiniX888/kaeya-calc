import { Talents } from '../../talent/types';
import Character from '../Character';
import aloyTalents from './AloyTalent';

export default class Aloy extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('aloy', level, hasAscended);
  }

  getTalentFns(): Talents {
    return aloyTalents;
  }
}
