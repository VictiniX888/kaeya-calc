import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import hutaoPassives from './HutaoPassive';
import hutaoTalents from './HutaoTalent';
import hutaoOptions from './HutaoOption';
import { CharacterPassive } from '../../passive/types';

export default class Hutao extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('hutao', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return hutaoTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return hutaoOptions;
  }

  getAllPassives(): CharacterPassive[] {
    return hutaoPassives;
  }
}
