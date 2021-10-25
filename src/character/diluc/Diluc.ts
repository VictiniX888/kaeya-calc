import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import dilucTalents from './DilucTalent';
import dilucOptions from './DilucOption';

export default class Diluc extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('diluc', level, hasAscended);
  }

  getTalentFns(): Talents {
    return dilucTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return dilucOptions;
  }
}
