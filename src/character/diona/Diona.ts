import { Talents } from '../../talent/types';
import Character from '../Character';
import dionaTalents from './DionaTalent';

export default class Diona extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('diona', level, hasAscended);
  }

  getTalentFns(): Talents {
    return dionaTalents;
  }
}
