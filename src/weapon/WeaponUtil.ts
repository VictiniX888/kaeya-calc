import Weapon from './Weapon';
import DragonsBane from './dragonsbane/DragonsBane';
import EngulfingLightning from './engulfinglightning/EngulfingLightning';
import EverlastingMoonglow from './everlastingmoonglow/EverlastingMoonglow';
import LuxuriousSeaLord from './luxurioussealord/LuxuriousSeaLord';
import SolarPearl from './solarpearl/SolarPearl';
import StaffOfHoma from './staffofhoma/StaffOfHoma';
import TheCatch from './thecatch/TheCatch';
import Whiteblind from './whiteblind/Whiteblind';

const weapons: Record<string, typeof Weapon> = {
  // Polearm
  dragonsbane: DragonsBane,
  engulfinglightning: EngulfingLightning,
  staffofhoma: StaffOfHoma,
  thecatch: TheCatch,

  // Catalyst
  everlastingmoonglow: EverlastingMoonglow,
  solarpearl: SolarPearl,

  // Claymore
  luxurioussealord: LuxuriousSeaLord,
  whiteblind: Whiteblind,
};

function getWeaponConstructor(id: string): typeof Weapon {
  return weapons[id] ?? Weapon;
}

export function initWeapon(
  id: string = '',
  level?: number,
  hasAscended?: boolean,
  refinement?: number
): Weapon {
  const WeaponConstructor = getWeaponConstructor(id);

  return new WeaponConstructor(id, level, hasAscended, refinement);
}
