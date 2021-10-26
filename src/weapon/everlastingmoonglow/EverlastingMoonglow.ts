import { WeaponPassive } from '../../passive/types';
import Weapon from '../Weapon';
import { everlastingMoonglowPassive } from './EverlastingMoonglowPassive';

export default class EverlastingMoonglow extends Weapon {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    refinement?: number
  ) {
    super('everlastingmoonglow', level, hasAscended, refinement);
  }

  getPassive(refinement: number): WeaponPassive {
    return everlastingMoonglowPassive(refinement);
  }
}
