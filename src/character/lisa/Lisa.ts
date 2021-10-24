import { Talents } from '../../talent/types';
import Character from '../Character';
import lisaTalents from './LisaTalent';

export default class Lisa extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('lisa', level, hasAscended);
  }

  getTalentFns(): Talents {
    return lisaTalents;
  }
}
