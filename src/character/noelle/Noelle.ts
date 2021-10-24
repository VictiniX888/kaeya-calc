import { Talents } from '../../talent/types';
import Character from '../Character';
import noelleTalents from './NoelleTalent';

export default class Noelle extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('noelle', level, hasAscended);
  }

  getTalentFns(): Talents {
    return noelleTalents;
  }
}
