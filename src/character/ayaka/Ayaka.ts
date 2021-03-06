import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import ayakaOptions from './AyakaOption';
import ayakaTalents from './AyakaTalent';

export default class Ayaka extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('ayaka', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return ayakaTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return ayakaOptions;
  }
}
