import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { staffOfHomaPassive } from './StaffOfHomaPassive';

export default class StaffOfHoma extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('staffofhoma', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return staffOfHomaPassive(refinement);
  }
}
