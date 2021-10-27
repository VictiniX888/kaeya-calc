import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { whiteblindPassive } from './WhiteblindPassive';

export default class Whiteblind extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('whiteblind', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return whiteblindPassive(refinement);
  }
}
