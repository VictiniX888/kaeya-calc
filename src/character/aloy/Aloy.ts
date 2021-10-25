import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import aloyOptions from './AloyOption';
import aloyTalents from './AloyTalent';

export default class Aloy extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('aloy', level, hasAscended);
  }

  getTalentFns(): Talents {
    return aloyTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return aloyOptions;
  }
}
