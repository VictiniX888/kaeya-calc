import { Talents } from '../../talent/types';
import Character from '../Character';
import raidenPassives from './RaidenPassive';
import raidenTalents from './RaidenTalent';
import raidenOptions from './RaidenOption';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { CharacterPassive } from '../../passive/types';

export default class Raiden extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('raiden', level, hasAscended);
  }

  getTalentFns(): Talents {
    return raidenTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return raidenOptions;
  }

  getAllPassives(): CharacterPassive[] {
    return raidenPassives;
  }
}
