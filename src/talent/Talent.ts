import Character from '../character/Character';
import Weapon from '../weapon/Weapon';
import reactionTalents from './ReactionTalent';
import { Talents } from './types';

export function getAllTalentFns(character: Character, weapon: Weapon): Talents {
  return {
    ...character.talentFns,
    ...weapon.talentFns,

    reaction: reactionTalents,
  };
}
