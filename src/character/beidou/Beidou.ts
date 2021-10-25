import { CharacterPassive } from '../../passive/types';
import { Talents } from '../../talent/types';
import Character from '../Character';
import beidouPassives from './BeidouPassive';
import beidouTalents from './BeidouTalent';

export default class Beidou extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('beidou', level, hasAscended);
  }

  getTalentFns(): Talents {
    return beidouTalents;
  }

  getAllPassives(): CharacterPassive[] {
    return beidouPassives;
  }
}
