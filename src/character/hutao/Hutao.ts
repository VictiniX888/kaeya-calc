import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import hutaoTalents from './HutaoTalent';
import hutaoOptions from './HutaoOption';

export default class Hutao extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('hutao', level, hasAscended);
  }

  getTalentFns(): Talents {
    return hutaoTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return hutaoOptions;
  }
}
