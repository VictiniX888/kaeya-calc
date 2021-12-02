import Constellation from '../../constellation/Constellation';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { CharacterPassive, TeamPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import eulaConstellations from './EulaConstellation';
import eulaOptions from './EulaOption';
import eulaPassives from './EulaPassive';
import eulaTalents from './EulaTalent';
import eulaTeamPassive from './EulaTeamPassive';

export default class Eula extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('eula', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return eulaTalents;
  }

  getCharacterOptionConstuctors(): typeof CharacterOption[] {
    return eulaOptions;
  }

  getAllPassives(): CharacterPassive[] {
    return eulaPassives;
  }

  getAllConstellations(): Constellation[] {
    return eulaConstellations;
  }

  getTeamPassive(): TeamPassive {
    return eulaTeamPassive;
  }
}
