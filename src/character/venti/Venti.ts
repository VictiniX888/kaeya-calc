import { Talents } from '../../talent/types';
import Character from '../Character';
import ventiTalents from './VentiTalent';

export default class Venti extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('venti', level, hasAscended);
  }

  getTalentFns(): Talents {
    return ventiTalents;
  }
}
