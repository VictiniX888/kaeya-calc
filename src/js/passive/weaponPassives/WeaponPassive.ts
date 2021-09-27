import { WeaponPassive, WeaponPassiveFn } from '../types';
import { solarPearlPassive } from './SolarPearlPassive';
import { theCatchPassive } from './TheCatchPassive';

const weaponPassives: Record<string, WeaponPassiveFn> = {
  Weapon_Pole_Mori: theCatchPassive,
  Weapon_Catalyst_NormalAttackAndSkillAttack: solarPearlPassive,
};

function defaultPassiveFn(): WeaponPassive[] {
  return [];
}

export function getWeaponPassiveFn(passiveId: string) {
  return weaponPassives[passiveId] ?? defaultPassiveFn;
}
