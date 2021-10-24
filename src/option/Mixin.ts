import { Stats } from '../data/types';
import DamageModifier from '../modifier/DamageModifer';

export enum Priority {
  Normal,
  Last,
}

interface Mixin {
  priority?: Priority;
}

export interface StatMixin extends Mixin {
  apply: (
    stats: Stats,
    talentAttackLevel: number,
    talentSkillLevel: number,
    talentBurstLevel: number,
    ascensionLevel: number
  ) => void;
}

// Do not modify stats here, use StatMixin for that purpose
export interface ModifierMixin extends Mixin {
  apply: (modifier: DamageModifier, stats: Stats) => void;
}
