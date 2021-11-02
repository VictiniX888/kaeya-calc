import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { watatsumiWavewalkerPassive } from './WatatsumiWavewalker';

export default class WavebreakersFin extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('wavebreakersfin', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return watatsumiWavewalkerPassive('wavebreakersfin')(refinement);
  }
}
