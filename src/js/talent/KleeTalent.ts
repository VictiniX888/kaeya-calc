import Talent from './Talent';
import { attackLightDefault, skillBase, burstBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const kleeTalent: Talent = {
  attack: kleeAttack,
  skill: kleeSkill,
  burst: kleeBurst,
};

export default kleeTalent;

function kleeAttack({ params, stats, modifier }: TalentProps) {
  return attackLightDefault({
    normalHits: 3,
    element: Element.Pyro,
    params,
    stats,
    modifier,
  });
}

function kleeSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'jumpyDumptyDmg',
      element: Element.Pyro,
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillBase({
      description: 'mineDmg',
      element: Element.Pyro,
      multiplier: params[3],
      stats,
      modifier,
    }),
  ];
}

function kleeBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'sparksNSplashDmg',
      element: Element.Pyro,
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}
