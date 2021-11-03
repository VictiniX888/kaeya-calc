import DamageModifier from '../modifier/DamageModifer';
import CharacterOption from '../option/characterOptions/CharacterOption';
import { StatMixin, ModifierMixin } from '../option/Mixin';

export default interface Constellation {
  constellationLevel: number;
  options?: typeof CharacterOption[];
  statMixin?: StatMixin;
  modifierMixin?: ModifierMixin;
}

export function ConstellationSkill(constellationLevel: number): Constellation {
  return {
    constellationLevel,
    modifierMixin: {
      apply: (modifier: DamageModifier) => {
        modifier.talentSkillLevel += 3;
      },
    },
  };
}

export function ConstellationBurst(constellationLevel: number): Constellation {
  return {
    constellationLevel,
    modifierMixin: {
      apply: (modifier: DamageModifier) => {
        modifier.talentBurstLevel += 3;
      },
    },
  };
}
