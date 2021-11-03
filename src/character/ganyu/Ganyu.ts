import { Talents } from '../../talent/types';
import Character from '../Character';
import ganyuTalents from './GanyuTalent';

export default class Ganyu extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('ganyu', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return ganyuTalents;
  }
}
