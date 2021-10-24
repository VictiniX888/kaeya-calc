import { Talents } from '../../talent/types';
import Character from '../Character';
import razorTalents from './RazorTalent';

export default class Razor extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('razor', level, hasAscended);
  }

  getTalentFns(): Talents {
    return razorTalents;
  }
}
