import { Talents } from '../../talent/types';
import Character from '../Character';
import xianglingTalents from './XianglingTalent';

export default class Xiangling extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('xiangling', level, hasAscended);
  }

  getTalentFns(): Talents {
    return xianglingTalents;
  }
}
