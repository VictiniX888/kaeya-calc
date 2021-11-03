import { Talents } from '../../talent/types';
import Character from '../Character';
import xingqiuTalents from './XingqiuTalent';

export default class Xingqiu extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('xingqiu', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return xingqiuTalents;
  }
}
