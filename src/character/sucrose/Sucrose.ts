import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import sucroseOptions from './SucroseOption';
import sucroseTalents from './SucroseTalent';

export default class Sucrose extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('sucrose', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return sucroseTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return sucroseOptions;
  }
}
