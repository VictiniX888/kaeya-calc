import { Talents } from '../../talent/types';
import Character from '../Character';
import sucroseTalents from './SucroseTalent';

export default class Sucrose extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('sucrose', level, hasAscended);
  }

  getTalentFns(): Talents {
    return sucroseTalents;
  }
}
