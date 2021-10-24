import { Talents } from '../../talent/types';
import Character from '../Character';
import keqingTalents from './KeqingTalent';

export default class Keqing extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('keqing', level, hasAscended);
  }

  getTalentFns(): Talents {
    return keqingTalents;
  }
}
