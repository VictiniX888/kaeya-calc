import { Talents } from '../../talent/types';
import Character from '../Character';
import amberTalents from './AmberTalent';

export default class Amber extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('amber', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return amberTalents;
  }
}
