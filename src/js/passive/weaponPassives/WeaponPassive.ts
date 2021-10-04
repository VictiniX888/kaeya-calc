import { WeaponPassive, WeaponPassiveFn } from '../types';
import { dragonsBanePassive } from './DragonsBanePassive';
import { engulfingLightningPassive } from './EngulfingLightningPassive';
import { everlastingMoonglowPassive } from './EverlastingMoonglowPassive';
import { solarPearlPassive } from './SolarPearlPassive';
import { staffOfHomaPassive } from './StaffOfHomaPassive';
import { theCatchPassive } from './TheCatchPassive';

const weaponPassives: Record<string, WeaponPassiveFn> = {
  // Polearm
  Weapon_Pole_DamageUpToWaterEnemy: dragonsBanePassive,
  Weapon_Pole_Homa: staffOfHomaPassive,
  Weapon_Pole_Mori: theCatchPassive,
  Weapon_Pole_Narukami: engulfingLightningPassive,

  // Catalyst
  Weapon_Catalyst_NormalAttackAndSkillAttack: solarPearlPassive,
  Weapon_Catalyst_Kaleido: everlastingMoonglowPassive,
};

function defaultPassiveFn(): WeaponPassive[] {
  return [];
}

export function getWeaponPassiveFn(passiveId: string) {
  return weaponPassives[passiveId] ?? defaultPassiveFn;
}
