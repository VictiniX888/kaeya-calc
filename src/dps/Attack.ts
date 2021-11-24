import Option from '../option/Option';
import { TalentValue } from '../talent/types';

export default interface Attack {
  talentType: string;
  talentId: string;
  multiplier: number;
  talentValue: TalentValue;
  options: Option[];
}

export const defaultAttack: Attack = {
  talentType: '',
  talentId: '',
  multiplier: 1,
  talentValue: { damage: [NaN] },
  options: [],
};
