import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import monaOptions from './MonaOption';
import monaTalents from './MonaTalent';

export default class Mona extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('mona', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return monaTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return monaOptions;
  }
}
