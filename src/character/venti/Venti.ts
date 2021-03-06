import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import ventiTalents from './VentiTalent';
import ventiOptions from './VentiOption';

export default class Venti extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('venti', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return ventiTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return ventiOptions;
  }
}
