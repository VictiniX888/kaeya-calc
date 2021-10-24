import { Talents } from '../../talent/types';
import Character from '../Character';
import ayakaTalents from './AyakaTalent';

export default class Ayaka extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('ayaka', level, hasAscended);
  }

  getTalentFns(): Talents {
    return ayakaTalents;
  }
}
