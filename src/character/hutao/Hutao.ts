import { Talents } from '../../talent/types';
import Character from '../Character';
import hutaoTalents from './HutaoTalent';

export default class Hutao extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('hutao', level, hasAscended);
  }

  getTalentFns(): Talents {
    return hutaoTalents;
  }
}
