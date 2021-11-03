import { Talents } from '../../talent/types';
import Character from '../Character';
import kokomiPassives from './KokomiPassive';
import kokomiTalents from './KokomiTalent';
import kokomiOptions from './KokomiOption';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { CharacterPassive } from '../../passive/types';

export default class Kokomi extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('kokomi', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return kokomiTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return kokomiOptions;
  }

  getAllPassives(): CharacterPassive[] {
    return kokomiPassives;
  }
}
