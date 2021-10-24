import { Talents } from '../../talent/types';
import Character from '../Character';
import barbaraTalents from './BarbaraTalent';

export default class Barbara extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('barbara', level, hasAscended);
  }

  getTalentFns(): Talents {
    return barbaraTalents;
  }
}
