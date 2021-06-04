import Talent from './Talent';
import { attackLightDefault, healingSkillBase, skillBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const barbaraTalent: Talent = {
  attack: barbaraAttack,
  skill: barbaraSkill,
  burst: barbaraBurst,
};

export default barbaraTalent;

function barbaraAttack({ params, stats, modifier }: TalentProps) {
  return attackLightDefault({
    normalHits: 4,
    element: Element.Hydro,
    params,
    stats,
    modifier,
  });
}

function barbaraSkill({ params, stats, modifier }: TalentProps) {
  let talentDmg = [
    healingSkillBase({
      description: 'hpRegenContinuous',
      params: params.slice(0, 2),
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenOnHit',
      params: params.slice(2, 4),
      stats,
      modifier,
    }),

    skillBase({
      description: 'dropletDmg',
      element: Element.Hydro,
      multiplier: params[4],
      stats,
      modifier,
    }),
  ];

  return talentDmg;
}

function barbaraBurst({ params, stats, modifier }: TalentProps) {
  return [
    healingSkillBase({
      description: 'hpRegen',
      params,
      stats,
      modifier,
    }),
  ];
}
