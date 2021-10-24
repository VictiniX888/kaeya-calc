import { Talents } from '../../talent/types';
import Character from '../Character';
import raidenTalents from './RaidenTalent';

export default class Raiden extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('raiden', level, hasAscended);
  }

  getTalentFns(): Talents {
    return raidenTalents;
  }
}
