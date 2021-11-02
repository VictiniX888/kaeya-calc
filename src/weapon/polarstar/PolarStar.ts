import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { polarStarPassive } from './PolarStarPassive';

export default class PolarStar extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('polarstar', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return polarStarPassive(refinement);
  }
}
