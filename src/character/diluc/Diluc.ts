import { Talents } from '../../talent/types';
import Character from '../Character';
import dilucTalents from './DilucTalent';

export default class Diluc extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('diluc', level, hasAscended);
  }

  getTalentFns(): Talents {
    return dilucTalents;
  }
}
