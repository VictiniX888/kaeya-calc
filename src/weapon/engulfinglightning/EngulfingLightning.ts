import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { engulfingLightningPassive } from './EngulfingLightningPassive';

export default class EngulfingLightning extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('engulfinglightning', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return engulfingLightningPassive(refinement);
  }
}
