import Talent from './Talent';
import { attackHeavyDefault, skillDefault, burstDefault } from './TalentUtil';
import { TalentProps, Element } from './types';

const chongyunTalent: Talent = {
  attack: chongyunAttack,
  skill: chongyunSkill,
  burst: chongyunBurst,
};

export default chongyunTalent;

function chongyunAttack({ params, stats, modifier }: TalentProps) {
  const element = modifier.infusion ?? Element.Physical;
  return attackHeavyDefault({
    normalHits: 4,
    element,
    params,
    stats,
    modifier,
  });
}

function chongyunSkill({ params, stats, modifier }: TalentProps) {
  return skillDefault({
    element: Element.Cryo,
    params: params,
    stats,
    modifier,
  });
}

function chongyunBurst({ params, stats, modifier }: TalentProps) {
  return burstDefault({
    element: Element.Cryo,
    params: params,
    stats,
    modifier,
  });
}
