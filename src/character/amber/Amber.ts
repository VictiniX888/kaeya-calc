import { Talents } from '../../talent/types';
import Character from '../Character';
import amberTalents from './AmberTalent';

export default class Amber extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('amber', level, hasAscended);
  }

  getTalentFns(): Talents {
    return amberTalents;
  }
}
