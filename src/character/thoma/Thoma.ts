import { CharacterPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import thomaTalents from './ThomaTalent';
import thomaPassives from './ThomaPassive';
import Constellation from '../../constellation/Constellation';
import thomaConstellations from './ThomaConstellation';

export default class Thoma extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('thoma', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return thomaTalents;
  }

  getAllPassives(): CharacterPassive[] {
    return thomaPassives;
  }

  getAllConstellations(): Constellation[] {
    return thomaConstellations;
  }
}
