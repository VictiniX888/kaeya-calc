import { WeaponPassive, WeaponPassiveFn } from '../types';
import { engulfingLightningPassive } from './EngulfingLightningPassive';
import { everlastingMoonglowPassive } from './EverlastingMoonglowPassive';
import { solarPearlPassive } from './SolarPearlPassive';
import { theCatchPassive } from './TheCatchPassive';

const weaponPassives: Record<string, WeaponPassiveFn> = {
  Weapon_Pole_Mori: theCatchPassive,
  Weapon_Catalyst_NormalAttackAndSkillAttack: solarPearlPassive,
  Weapon_Catalyst_Kaleido: everlastingMoonglowPassive,
  Weapon_Pole_Narukami: engulfingLightningPassive,
};

function defaultPassiveFn(): WeaponPassive[] {
  return [];
}

export function getWeaponPassiveFn(passiveId: string) {
  return weaponPassives[passiveId] ?? defaultPassiveFn;
}
