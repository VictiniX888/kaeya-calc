import { Talents } from '../../talent/types';
import Character from '../Character';
import eulaTalents from './EulaTalent';

export default class Eula extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('eula', level, hasAscended);
  }

  getTalentFns(): Talents {
    return eulaTalents;
  }
}
