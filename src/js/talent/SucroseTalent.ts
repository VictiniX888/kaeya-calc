import Talent from './Talent';
import { attackLightDefault, skillDefault, burstBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const sucroseTalent: Talent = {
  attack: sucroseAttack,
  skill: sucroseSkill,
  burst: sucroseBurst,
};

export default sucroseTalent;

function sucroseAttack({ params, stats, modifier }: TalentProps) {
  return attackLightDefault({
    normalHits: 4,
    element: Element.Anemo,
    params,
    stats,
    modifier,
  });
}

function sucroseSkill({ params, stats, modifier }: TalentProps) {
  return skillDefault({
    element: Element.Anemo,
    params,
    stats,
    modifier,
  });
}

function sucroseBurst({ params, stats, modifier }: TalentProps) {
  let talentValues = [];
  talentValues.push(
    burstBase({
      description: 'dot',
      element: Element.Anemo,
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  if (modifier.elementalAbsorption !== undefined) {
    talentValues.push(
      burstBase({
        description: 'dotElementalAbsorption',
        element: modifier.elementalAbsorption,
        multiplier: params[1],
        stats,
        modifier,
      })
    );
  }

  return talentValues;
}
