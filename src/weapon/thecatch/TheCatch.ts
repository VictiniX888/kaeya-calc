import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { theCatchPassive } from './TheCatchPassive';

export default class TheCatch extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('thecatch', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return theCatchPassive(refinement);
  }
}
