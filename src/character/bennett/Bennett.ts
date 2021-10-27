import CharacterOption from '../../option/characterOptions/CharacterOption';
import { Talents } from '../../talent/types';
import Character from '../Character';
import bennettTalents from './BennettTalent';
import bennettTeamOptions from './BennettTeamOption';

export default class Bennett extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('bennett', level, hasAscended);
  }

  getTalentFns(): Talents {
    return bennettTalents;
  }

  getTeamOptionConstructors(): typeof CharacterOption[] {
    return bennettTeamOptions;
  }
}
