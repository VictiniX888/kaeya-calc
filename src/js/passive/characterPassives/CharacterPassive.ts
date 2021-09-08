import { CharacterPassive, CharacterPassiveFn } from '../types';
import { aloyAscension1, aloyAscension4 } from './AloyPassive';
import { kokomiAscension0, kokomiAscension4 } from './KokomiPassive';
import { raidenAscension4 } from './RaidenPassive';
import { yoimiyaAscension1 } from './YoimiyaPassive';

const characterPassives: Record<string, CharacterPassiveFn> = {
  Yoimiya_PermanentSkill_1: yoimiyaAscension1,
  Shougun_PermanentSkill_2: raidenAscension4,
  // Workaround because Kokomi's A0 passive has no associated id
  Kokomi_ProudSkill_SwimStamina_Reduction: kokomiAscension0,
  Kokomi_PermanentSkill_2: kokomiAscension4,
  Aloy_PermanentSkill_1: aloyAscension1,
  Aloy_PermanentSkill_2: aloyAscension4,
};

function defaultPassiveFn(): CharacterPassive[] {
  return [];
}

export function getCharacterPassiveFn(passiveId: string) {
  return characterPassives[passiveId] ?? defaultPassiveFn;
}
