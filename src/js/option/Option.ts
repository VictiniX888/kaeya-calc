import { ModifierMixin, StatMixin } from './Mixin';

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
  applyOnStats: StatMixin;
}

export interface IModifierApplicable {
  applyOnModifier: ModifierMixin;
}
