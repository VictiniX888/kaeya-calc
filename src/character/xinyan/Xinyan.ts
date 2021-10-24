import { Talents } from '../../talent/types';
import Character from '../Character';
import xinyanTalents from './XinyanTalent';

export default class Xinyan extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('xinyan', level, hasAscended);
  }

  getTalentFns(): Talents {
    return xinyanTalents;
  }
}
