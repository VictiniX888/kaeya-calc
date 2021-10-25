import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import yanfeiOptions from './YanfeiOption';
import yanfeiTalents from './YanfeiTalent';

export default class Yanfei extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('yanfei', level, hasAscended);
  }

  getTalentFns(): Talents {
    return yanfeiTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return yanfeiOptions;
  }
}
