import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { luxuriousSeaLordPassive } from './LuxuriousSeaLordPassive';

export default class LuxuriousSeaLord extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('luxurioussealord', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return luxuriousSeaLordPassive(refinement);
  }
}
