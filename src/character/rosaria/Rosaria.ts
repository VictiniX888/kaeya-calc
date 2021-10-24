import { Talents } from '../../talent/types';
import Character from '../Character';
import rosariaTalents from './RosariaTalent';

export default class Rosaria extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('rosaria', level, hasAscended);
  }

  getTalentFns(): Talents {
    return rosariaTalents;
  }
}
