import { Talents } from '../../talent/types';
import Character from '../Character';
import sayuTalents from './SayuTalent';

export default class Sayu extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('sayu', level, hasAscended);
  }

  getTalentFns(): Talents {
    return sayuTalents;
  }
}
