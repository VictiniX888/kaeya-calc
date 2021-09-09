import { WeaponPassive, WeaponPassiveFn } from '../types';

const weaponPassives: Record<string, WeaponPassiveFn> = {};

function defaultPassiveFn(): WeaponPassive[] {
  return [];
}

export function getWeaponPassiveFn(passiveId: string) {
  return weaponPassives[passiveId] ?? defaultPassiveFn;
}
