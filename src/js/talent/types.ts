import { Stats, TalentParams } from '../../data/types';
import DamageModifier from '../modifier/DamageModifer';

export interface TalentValue {
  description: string;
  damage: number[];
}

export interface TalentProps {
  params: TalentParams;
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
