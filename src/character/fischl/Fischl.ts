import { Talents } from '../../talent/types';
import Character from '../Character';
import fischlTalents from './FischlTalent';

export default class Fischl extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('fischl', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return fischlTalents;
  }
}
