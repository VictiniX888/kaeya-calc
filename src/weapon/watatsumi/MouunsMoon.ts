import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { watatsumiWavewalkerPassive } from './WatatsumiWavewalker';

export default class MouunsMoon extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('mouunsmoon', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return watatsumiWavewalkerPassive('mouunsmoon')(refinement);
  }
}
