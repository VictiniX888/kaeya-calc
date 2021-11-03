import { Talents } from '../../talent/types';
import Character from '../Character';
import lisaTalents from './LisaTalent';

export default class Lisa extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('lisa', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return lisaTalents;
  }
}
