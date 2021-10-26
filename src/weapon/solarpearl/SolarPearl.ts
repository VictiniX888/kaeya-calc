import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { solarPearlPassive } from './SolarPearlPassive';

export default class SolarPearl extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('solarpearl', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return solarPearlPassive(refinement);
  }
}
