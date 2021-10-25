import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import noelleTalents from './NoelleTalent';
import noelleOptions from './NoelleOption';

export default class Noelle extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('noelle', level, hasAscended);
  }

  getTalentFns(): Talents {
    return noelleTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return noelleOptions;
  }
}
