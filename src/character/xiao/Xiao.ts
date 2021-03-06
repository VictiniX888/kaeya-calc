import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import xiaoOptions from './XiaoOption';
import xiaoTalents from './XiaoTalent';

export default class Xiao extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('xiao', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return xiaoTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return xiaoOptions;
  }
}
