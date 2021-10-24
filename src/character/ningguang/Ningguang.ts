import { Talents } from '../../talent/types';
import Character from '../Character';
import ningguangTalents from './NingguangTalent';

export default class Ningguang extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('ningguang', level, hasAscended);
  }

  getTalentFns(): Talents {
    return ningguangTalents;
  }
}
