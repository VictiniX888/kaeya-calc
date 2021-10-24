import { Talents } from '../../talent/types';
import Character from '../Character';
import xiaoTalents from './XiaoTalent';

export default class Xiao extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('xiao', level, hasAscended);
  }

  getTalentFns(): Talents {
    return xiaoTalents;
  }
}
