import { Talents } from '../../talent/types';
import Character from '../Character';
import yanfeiTalents from './YanfeiTalent';

export default class Yanfei extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('yanfei', level, hasAscended);
  }

  getTalentFns(): Talents {
    return yanfeiTalents;
  }
}
