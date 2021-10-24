import { Talents } from '../../talent/types';
import Character from '../Character';

export default class CharacterDefault extends Character {
  getTalentFns(): Talents {
    return {};
  }
}
