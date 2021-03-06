import { Talents } from '../../talent/types';
import Character from '../Character';
import xinyanTalents from './XinyanTalent';

export default class Xinyan extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('xinyan', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return xinyanTalents;
  }
}
