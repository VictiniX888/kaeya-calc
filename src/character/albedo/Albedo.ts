import Constellation from '../../constellation/Constellation';
import { CharacterPassive, TeamPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import albedoConstellations from './AlbedoConstellation';
import albedoPassives from './AlbedoPassive';
import albedoTalents from './AlbedoTalent';
import albedoTeamPassive from './AlbedoTeamPassive';

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

  getAllPassives(): CharacterPassive[] {
    return albedoPassives;
  }

  getAllConstellations(): Constellation[] {
    return albedoConstellations;
  }

  getTeamPassive(): TeamPassive {
    return albedoTeamPassive;
  }
}
