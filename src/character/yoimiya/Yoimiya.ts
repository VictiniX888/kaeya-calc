import CharacterOption from '../../option/characterOptions/CharacterOption';
import { CharacterPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import yoimiyaOptions from './YoimiyaOption';
import yoimiyaPassives from './YoimiyaPassive';
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

  getAllPassives(): CharacterPassive[] {
    return yoimiyaPassives;
  }
}
