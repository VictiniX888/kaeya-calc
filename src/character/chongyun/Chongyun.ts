import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import chongyunOptions from './ChongyunOption';
import chongyunTalents from './ChongyunTalent';

export default class Chongyun extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('chongyun', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return chongyunTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return chongyunOptions;
  }
}
