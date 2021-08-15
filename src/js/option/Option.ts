import { Stats } from '../../data/types';
import DamageModifier from '../modifier/DamageModifer';

export default class Option {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export interface IOptionBoolean {
  value: boolean;
}

export interface IOptionPicker {
  value: string;
  choices: string[];
}

export interface IOptionNumber {
  value: number;
}

export interface IStatsApplicable {
  applyOnStats: (
    stats: Stats,
    talentAttackLevel: number,
    talentSkillLevel: number,
    talentBurstLevel: number,
    ascensionLevel: number
  ) => void;
}

export interface IModifierApplicable {
  applyOnModifier: (modifier: DamageModifier) => void;
}
