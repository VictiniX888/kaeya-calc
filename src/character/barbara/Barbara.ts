import { Talents } from '../../talent/types';
import Character from '../Character';
import barbaraTalents from './BarbaraTalent';

export default class Barbara extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('barbara', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return barbaraTalents;
  }
}
