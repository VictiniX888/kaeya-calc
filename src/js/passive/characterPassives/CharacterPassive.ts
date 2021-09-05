import { CharacterPassive, CharacterPassiveFn } from '../types';
import { raidenAscension4 } from './RaidenPassive';
import { yoimiyaAscension1 } from './YoimiyaPassive';

const characterPassives: Record<string, CharacterPassiveFn> = {
  Yoimiya_PermanentSkill_1: yoimiyaAscension1,
  Shougun_PermanentSkill_2: raidenAscension4,
};

function defaultPassiveFn(): CharacterPassive[] {
  return [];
}

export function getCharacterPassiveFn(passiveId: string) {
  return characterPassives[passiveId] ?? defaultPassiveFn;
}
