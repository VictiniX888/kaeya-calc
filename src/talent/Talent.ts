import Character from '../character/Character';
import Weapon from '../weapon/Weapon';
import { Talents } from './types';

export function getAllTalentFns(character: Character, weapon: Weapon): Talents {
  return {
    ...character.talentFns,
    ...weapon.talentFns,
  };
}
