import Talent from './Talent';
import { TalentValue } from './types';

const defaultTalent: Talent = {
  attack: defaultTalentFn,
  skill: defaultTalentFn,
  burst: defaultTalentFn,
};

export default defaultTalent;

// Placeholder function
export function defaultTalentFn(): TalentValue[] {
  return [];
}
