import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { dragonsBanePassive } from './DragonsBanePassive';

export default class DragonsBane extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('dragonsbane', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return dragonsBanePassive(refinement);
  }
}
