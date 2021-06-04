import Talent from './Talent';
import { attackLightDefault, skillBase, burstBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const monaTalent: Talent = {
  attack: monaAttack,
  skill: monaSkill,
  burst: monaBurst,
};

export default monaTalent;

function monaAttack({ params, stats, modifier }: TalentProps) {
  return attackLightDefault({
    normalHits: 4,
    element: Element.Hydro,
    params,
    stats,
    modifier,
  });
}

function monaSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'dot',
      element: Element.Hydro,
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillBase({
      description: 'explosionDmg',
      element: Element.Hydro,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

function monaBurst({ params, stats, modifier }: TalentProps) {
  let modifiedStats = { ...stats };
  if (modifiedStats.dmgBonus !== undefined) {
    modifiedStats.dmgBonus += params[9];
  } else {
    modifiedStats.dmgBonus = params[9];
  }

  return [
    burstBase({
      description: 'explosionDmg',
      element: Element.Hydro,
      multiplier: params[1],
      stats: modifiedStats,
      modifier,
    }),
  ];
}
