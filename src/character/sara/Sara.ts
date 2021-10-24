import { Talents } from '../../talent/types';
import Character from '../Character';
import saraTalents from './SaraTalent';

export default class Sara extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('sara', level, hasAscended);
  }

  getTalentFns(): Talents {
    return saraTalents;
  }
}
