import { Talents } from '../../talent/types';
import Character from '../Character';
import monaTalents from './MonaTalent';

export default class Mona extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('mona', level, hasAscended);
  }

  getTalentFns(): Talents {
    return monaTalents;
  }
}
