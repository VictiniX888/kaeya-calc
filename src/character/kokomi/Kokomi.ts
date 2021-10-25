import { Talents } from '../../talent/types';
import Character from '../Character';
import kokomiTalents from './KokomiTalent';
import kokomiOptions from './KokomiOption';
import CharacterOption from '../../option/characterOptions/CharacterOption';

export default class Kokomi extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('kokomi', level, hasAscended);
  }

  getTalentFns(): Talents {
    return kokomiTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return kokomiOptions;
  }
}
