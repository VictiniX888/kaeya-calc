import CinnabarSpindle from './cinnabarspindle/CinnarbarSpindle';
import DragonsBane from './dragonsbane/DragonsBane';
import EngulfingLightning from './engulfinglightning/EngulfingLightning';
import EverlastingMoonglow from './everlastingmoonglow/EverlastingMoonglow';
import LuxuriousSeaLord from './luxurioussealord/LuxuriousSeaLord';
import PolarStar from './polarstar/PolarStar';
import SolarPearl from './solarpearl/SolarPearl';
import StaffOfHoma from './staffofhoma/StaffOfHoma';
import TheCatch from './thecatch/TheCatch';
import Akuoumaru from './watatsumi/Akuoumaru';
import MouunsMoon from './watatsumi/MouunsMoon';
import WavebreakersFin from './watatsumi/WavebreakersFin';
import Weapon from './Weapon';
import Whiteblind from './whiteblind/Whiteblind';

const weapons: Record<string, typeof Weapon> = {
  // Sword
  cinnabarspindle: CinnabarSpindle,

  // Polearm
  dragonsbane: DragonsBane,
  engulfinglightning: EngulfingLightning,
  staffofhoma: StaffOfHoma,
  thecatch: TheCatch,
  wavebreakersfin: WavebreakersFin,

  // Catalyst
  everlastingmoonglow: EverlastingMoonglow,
  solarpearl: SolarPearl,

  // Claymore
  luxurioussealord: LuxuriousSeaLord,
  whiteblind: Whiteblind,
  akuoumaru: Akuoumaru,

  // Bow
  polarstar: PolarStar,
  mouunsmoon: MouunsMoon,
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
