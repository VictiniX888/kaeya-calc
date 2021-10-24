import { Talents } from '../../talent/types';
import Character from '../Character';
import kazuhaTalents from './KazuhaTalent';

export default class Kazuha extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('kazuha', level, hasAscended);
  }

  getTalentFns(): Talents {
    return kazuhaTalents;
  }
}
