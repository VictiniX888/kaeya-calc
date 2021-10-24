import { Talents } from '../../talent/types';
import Character from '../Character';
import kokomiTalents from './KokomiTalent';

export default class Kokomi extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('kokomi', level, hasAscended);
  }

  getTalentFns(): Talents {
    return kokomiTalents;
  }
}
