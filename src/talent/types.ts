import { Stats } from '../data/types';
import DamageModifier from '../modifier/DamageModifer';

export type TalentFn = (props: TalentProps) => TalentValue;

export type Talents = Record<string, Record<string, TalentFn>>;

export type TalentValueSet = Record<string, Record<string, TalentValue>>;

export interface TalentValue {
  damage: number[];
  element?: Element;
}

export interface TalentProps {
  stats: Stats;
  modifier: DamageModifier;
}

export enum TalentType {
  Attack = 'attack',
  Skill = 'skill',
  Burst = 'burst',
}

export enum Element {
  Anemo = 'anemo',
  Cryo = 'cryo',
  Electro = 'electro',
  Geo = 'geo',
  Hydro = 'hydro',
  Pyro = 'pyro',
  Physical = 'physical',
}

export enum AttackType {
  None = 'none',
  Normal = 'normal',
  Charged = 'charged',
  Plunge = 'plunge',
  Skill = 'skill',
  Burst = 'burst',
}

export enum ScalingType {
  Attack = 'attack',
  Defense = 'defense',
  Hp = 'hp',
}
