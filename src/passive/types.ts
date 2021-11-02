import CharacterOption from '../option/characterOptions/CharacterOption';
import { ModifierMixin, StatMixin } from '../option/Mixin';
import WeaponOption from '../option/weaponOptions/WeaponOption';

interface Passive {
  id: string;
  statMixin?: StatMixin;
  modifierMixin?: ModifierMixin;
}

export interface CharacterPassive extends Passive {
  ascensionLevel: number;
  options: typeof CharacterOption[];
}

export interface WeaponPassive extends Passive {
  options: typeof WeaponOption[];
}
