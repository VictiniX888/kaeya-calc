import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import sayuTalents from './SayuTalent';
import sayuOptions from './SayuOption';

export default class Sayu extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('sayu', level, hasAscended);
  }

  getTalentFns(): Talents {
    return sayuTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return sayuOptions;
  }
}
