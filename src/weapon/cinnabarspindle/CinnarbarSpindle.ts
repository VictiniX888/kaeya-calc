import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { cinnabarSpindlePassive } from './CinnabarSpindlePassive';

export default class CinnabarSpindle extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('cinnabarspindle', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return cinnabarSpindlePassive(refinement);
  }
}
