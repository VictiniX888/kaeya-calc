import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import kazuhaTalents from './KazuhaTalent';
import kazuhaOptions from './KazuhaOption';

export default class Kazuha extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('kazuha', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return kazuhaTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return kazuhaOptions;
  }
}
