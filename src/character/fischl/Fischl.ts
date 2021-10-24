import { Talents } from '../../talent/types';
import Character from '../Character';
import fischlTalents from './FischlTalent';

export default class Fischl extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('fischl', level, hasAscended);
  }

  getTalentFns(): Talents {
    return fischlTalents;
  }
}
