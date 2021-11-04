import { CharacterPassive, TeamPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import tartagliaTalents from './TartagliaTalent';
import tartagliaPassives from './TartagliaPassive';
import tartagliaTeamPassive from './TartagliaTeamPassive';

export default class Tartaglia extends Character {
  constructor(
    _id: string,
    level?: number,
    hasAscended?: boolean,
    constellationLevel?: number
  ) {
    super('tartaglia', level, hasAscended, constellationLevel);
  }

  getTalentFns(): Talents {
    return tartagliaTalents;
  }

  getAllPassives(): CharacterPassive[] {
    return tartagliaPassives;
  }

  getTeamPassive(): TeamPassive {
    return tartagliaTeamPassive;
  }
}
