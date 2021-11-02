import { CharacterPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import thomaTalents from './ThomaTalent';
import thomaPassives from './ThomaPassive';

export default class Thoma extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('thoma', level, hasAscended);
  }

  getTalentFns(): Talents {
    return thomaTalents;
  }

  getAllPassives(): CharacterPassive[] {
    return thomaPassives;
  }
}
