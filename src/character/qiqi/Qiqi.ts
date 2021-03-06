import { Talents } from '../../talent/types';
import Character from '../Character';
import qiqiTalents from './QiqiTalent';

export default class Qiqi extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('qiqi', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return qiqiTalents;
  }
}
