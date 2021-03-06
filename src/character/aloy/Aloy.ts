import CharacterOption from '../../option/characterOptions/CharacterOption';
import { CharacterPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import aloyOptions from './AloyOption';
import aloyPassives from './AloyPassive';
import aloyTalents from './AloyTalent';

export default class Aloy extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('aloy', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return aloyTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return aloyOptions;
  }

  getAllPassives(): CharacterPassive[] {
    return aloyPassives;
  }
}
