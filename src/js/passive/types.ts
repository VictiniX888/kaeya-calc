import { TalentParams } from '../../data/types';
import { CharacterOption } from '../option/characterOptions';
import { ModifierMixin, StatMixin } from '../option/Mixin';
import WeaponOption from '../option/weaponOptions/WeaponOption';

interface Passive {
  id: string;
  statMixin?: StatMixin;
  modifierMixin?: ModifierMixin;
}

export interface CharacterPassive extends Passive {
  options: typeof CharacterOption[];
}

export type CharacterPassiveFn = (params: TalentParams) => CharacterPassive;

export interface WeaponPassive extends Passive {
  options: typeof WeaponOption[];
}

export type WeaponPassiveFn = (params: TalentParams) => WeaponPassive;
