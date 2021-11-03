import { Talents } from '../../talent/types';
import Character from '../Character';
import albedoTalents from './AlbedoTalent';

export default class Albedo extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('albedo', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return albedoTalents;
  }
}
