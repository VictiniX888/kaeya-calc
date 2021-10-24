import { Talents } from '../../talent/types';
import Character from '../Character';
import chongyunTalents from './ChongyunTalent';

export default class Chongyun extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('chongyun', level, hasAscended);
  }

  getTalentFns(): Talents {
    return chongyunTalents;
  }
}
