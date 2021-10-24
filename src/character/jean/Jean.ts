import { Talents } from '../../talent/types';
import Character from '../Character';
import jeanTalents from './JeanTalent';

export default class Jean extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('jean', level, hasAscended);
  }

  getTalentFns(): Talents {
    return jeanTalents;
  }
}
