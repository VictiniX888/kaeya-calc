import { CharacterPassive, CharacterPassiveFn } from './types';
import { yoimiyaAscension1 } from './YoimiyaPassive';

const characterPassives: Record<string, CharacterPassiveFn> = {
  Yoimiya_PermanentSkill_1: yoimiyaAscension1,
};

function defaultPassiveFn(): CharacterPassive[] {
  return [];
}

export function getCharacterPassiveFn(passiveId: string) {
  return characterPassives[passiveId] ?? defaultPassiveFn;
}
