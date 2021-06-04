import Talent from './Talent';
import { attackBowDefault, skillBase, burstBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const ventiTalent: Talent = {
  attack: ventiAttack,
  skill: ventiSkill,
  burst: ventiBurst,
};

export default ventiTalent;

function ventiAttack({ params, stats, modifier }: TalentProps) {
  return attackBowDefault({
    normalHits: 6,
    chargedElement: Element.Anemo,
    params,
    stats,
    modifier,
  });
}

function ventiSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'pressDmg',
      element: Element.Anemo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillBase({
      description: 'holdDmg',
      element: Element.Anemo,
      multiplier: params[2],
      stats,
      modifier,
    }),
  ];
}

function ventiBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'dot',
      element: Element.Anemo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    // Not sure how the elemental absorption dmg is calculated
    burstBase({
      description: 'dotElementalAbsorption',
      element: Element.Anemo,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}
