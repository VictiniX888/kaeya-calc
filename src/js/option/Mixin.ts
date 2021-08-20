import { Stats } from '../../data/types';
import DamageModifier from '../modifier/DamageModifer';

export type StatMixin = (
  stats: Stats,
  talentAttackLevel: number,
  talentSkillLevel: number,
  talentBurstLevel: number,
  ascensionLevel: number
) => void;

export type ModifierMixin = (modifier: DamageModifier) => void;
