import Talent from './Talent';
import { attackLightMulti, burstBase, skillDefault } from './TalentUtil';
import { Element, TalentProps } from './types';

const ayakaTalent: Talent = {
  attack: ayakaAttack,
  skill: ayakaSkill,
  burst: ayakaBurst,
};

export default ayakaTalent;

function ayakaAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 3, 1],
    chargedHits: 3,
    element: modifier.infusion ?? Element.Physical,
    params: params
      .slice(0, 4)
      .concat([params[6], params[7], params[7]])
      .concat(params.slice(7, 12)),
    stats,
    modifier,
  });
}

function ayakaSkill({ params, stats, modifier }: TalentProps) {
  return skillDefault({
    element: Element.Cryo,
    params,
    stats,
    modifier,
  });
}

function ayakaBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'cuttingDmg',
      element: Element.Cryo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'bloomDmg',
      element: Element.Cryo,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}
