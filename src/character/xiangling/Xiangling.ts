import { Talents } from '../../talent/types';
import Character from '../Character';
import xianglingTalents from './XianglingTalent';

export default class Xiangling extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('xiangling', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return xianglingTalents;
  }
}
