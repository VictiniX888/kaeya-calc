import { WeaponPassive, WeaponPassiveFn } from '../types';
import { theCatchPassive } from './TheCatchPassive';

const weaponPassives: Record<string, WeaponPassiveFn> = {
  Weapon_Pole_Mori: theCatchPassive,
};

function defaultPassiveFn(): WeaponPassive[] {
  return [];
}

export function getWeaponPassiveFn(passiveId: string) {
  return weaponPassives[passiveId] ?? defaultPassiveFn;
}
