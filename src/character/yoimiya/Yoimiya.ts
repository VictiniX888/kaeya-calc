import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import yoimiyaOptions from './YoimiyaOption';
import yoimiyaTalents from './YoimiyaTalent';

export default class Yoimiya extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('yoimiya', level, hasAscended);
  }

  getTalentFns(): Talents {
    return yoimiyaTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return yoimiyaOptions;
  }
}
