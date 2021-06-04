import Talent from './Talent';
import { attackLightMulti, skillDefault, burstDefault } from './TalentUtil';
import { TalentProps, Element } from './types';

const kaeyaTalent: Talent = {
  attack: kaeyaAttack,
  skill: kaeyaSkill,
  burst: kaeyaBurst,
};

export default kaeyaTalent;

function kaeyaAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 1, 1],
    chargedHits: 2,
    params,
    stats,
    modifier,
  });
}

function kaeyaSkill({ params, stats, modifier }: TalentProps) {
  return skillDefault({
    element: Element.Cryo,
    params,
    stats,
    modifier,
  });
}

function kaeyaBurst({ params, stats, modifier }: TalentProps) {
  return burstDefault({
    element: Element.Cryo,
    params,
    stats,
    modifier,
  });
}
