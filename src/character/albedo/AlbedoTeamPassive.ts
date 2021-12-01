import { getTalentData } from '../../data/Data';
import { Stats } from '../../data/types';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import { IOptionBoolean, IStatsApplicable } from '../../option/Option';
import { TeamPassive } from '../../passive/types';
import {
  AlbedoOptionConstellation4,
  AlbedoOptionConstellation6,
} from './AlbedoConstellation';

const [, { params: a4Params }] = getTalentData('albedo').passives;

class AlbedoOptionAscension4
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('albedoAscension4');
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.elementalMastery = a4Params[0] + (stats.elementalMastery ?? 0);
      }
    },
  };
}

const albedoTeamPassive: TeamPassive = {
  id: 'albedoTeamPassive',
  options: [
    AlbedoOptionAscension4,
    AlbedoOptionConstellation4('albedoConstellation4Team'),
    AlbedoOptionConstellation6('albedoConstellation6Team'),
  ],
};
export default albedoTeamPassive;
