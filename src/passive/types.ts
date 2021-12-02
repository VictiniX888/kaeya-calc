import CharacterOption from '../option/characterOptions/CharacterOption';
import { ModifierMixin, StatMixin } from '../option/Mixin';
import WeaponOption from '../option/weaponOptions/WeaponOption';
import { Talents } from '../talent/types';

interface Passive {
  id: string;
  statMixin?: StatMixin;
  modifierMixin?: ModifierMixin;
}

export interface CharacterPassive extends Passive {
  ascensionLevel: number;
  options: typeof CharacterOption[];
  talents?: Talents;
}

export interface WeaponPassive extends Passive {
  options: typeof WeaponOption[];
}

export interface TeamPassive extends Passive {
  options?: typeof CharacterOption[];
}
