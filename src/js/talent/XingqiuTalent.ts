import Talent from './Talent';
import { attackLightMulti, skillMultiBase, burstBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const xingqiuTalent: Talent = {
  attack: xingqiuAttack,
  skill: xingqiuSkill,
  burst: xingqiuBurst,
};

export default xingqiuTalent;

function xingqiuAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 2, 1, 2],
    chargedHits: 2,
    params: params
      .slice(0, 3)
      .concat(params.slice(4, 6))
      .concat(params.slice(7)),
    stats,
    modifier,
  });
}

function xingqiuSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillMultiBase({
      description: 'skillDmg',
      hits: 2,
      element: Element.Hydro,
      params,
      stats,
      modifier,
    }),
  ];
}

function xingqiuBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'swordRainDmg',
      element: Element.Hydro,
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}
