import { Talents } from '../../talent/types';
import Character from '../Character';
import ningguangTalents from './NingguangTalent';

export default class Ningguang extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('ningguang', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return ningguangTalents;
  }
}
