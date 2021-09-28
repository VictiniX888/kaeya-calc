import { Stats } from '../../data/types';
import DamageModifier from '../modifier/DamageModifer';

export type StatMixin = (
  stats: Stats,
  talentAttackLevel: number,
  talentSkillLevel: number,
  talentBurstLevel: number,
  ascensionLevel: number
) => void;

// Do not modify stats here, use StatMixin for that purpose
export type ModifierMixin = (modifier: DamageModifier, stats: Stats) => void;
