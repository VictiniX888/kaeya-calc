import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { watatsumiWavewalkerPassive } from './WatatsumiWavewalker';

export default class Akuoumaru extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('akuoumaru', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return watatsumiWavewalkerPassive('akuoumaru')(refinement);
  }
}
