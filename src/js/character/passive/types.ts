import { TalentParams } from '../../../data/types';
import { CharacterOption } from '../../option/characterOptions';

export type CharacterPassiveFn = (params: TalentParams) => CharacterPassive;

export interface CharacterPassive {
  options: typeof CharacterOption[];
}
