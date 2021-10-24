import { Talents } from '../../talent/types';
import Character from '../Character';
import zhongliTalents from './ZhongliTalent';

export default class Zhongli extends Character {
  constructor(_id: string, level?: number, hasAscended?: boolean) {
    super('zhongli', level, hasAscended);
  }

  getTalentFns(): Talents {
    return zhongliTalents;
  }
}
