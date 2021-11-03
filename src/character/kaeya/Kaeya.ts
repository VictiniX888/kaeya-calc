import { Talents } from '../../talent/types';
import Character from '../Character';
import kaeyaTalents from './KaeyaTalent';

export default class Kaeya extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('kaeya', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return kaeyaTalents;
  }
}
