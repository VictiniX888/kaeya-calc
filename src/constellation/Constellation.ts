import CharacterOption from '../option/characterOptions/CharacterOption';
import { StatMixin, ModifierMixin } from '../option/Mixin';

export default interface Constellation {
  constellationLevel: number;
  options?: typeof CharacterOption[];
  statMixin?: StatMixin;
  modifierMixin?: ModifierMixin;
}
