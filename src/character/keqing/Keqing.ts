import { Talents } from '../../talent/types';
import Character from '../Character';
import keqingTalents from './KeqingTalent';

export default class Keqing extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('keqing', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return keqingTalents;
  }
}
