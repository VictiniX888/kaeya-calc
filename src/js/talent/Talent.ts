import { Talents } from './types';

import albedoTalents from '../character/albedo/AlbedoTalent';

const talents: Record<string, Talents> = {
  albedo: albedoTalents,
};

export function getAllTalentFns(characterId: string): Talents | undefined {
  return talents[characterId];
}
