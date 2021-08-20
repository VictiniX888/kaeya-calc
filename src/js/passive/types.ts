import { TalentParams } from '../../data/types';
import { CharacterOption } from '../option/characterOptions';
import { ModifierMixin, StatMixin } from '../option/Mixin';

export type CharacterPassiveFn = (params: TalentParams) => CharacterPassive;

export interface CharacterPassive {
  options: typeof CharacterOption[];
  statMixin?: StatMixin;
  modifierMixin?: ModifierMixin;
}
