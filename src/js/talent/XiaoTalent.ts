import { defaultTalentFn } from './DefaultTalent';
import Talent from './Talent';
import { attackLightMulti, skillDefault } from './TalentUtil';
import { TalentProps, Element } from './types';

const xiaoTalent: Talent = {
  attack: xiaoAttack,
  skill: xiaoSkill,
  burst: xiaoBurst,
};

export default xiaoTalent;

function xiaoAttack({ params, stats, modifier }: TalentProps) {
  const element = modifier.infusion ?? Element.Physical;

  return attackLightMulti({
    normalHits: [2, 1, 1, 2, 1, 1],
    element,
    params: params.slice(1, 5).concat(params.slice(6)),
    stats,
    modifier,
  });
}

function xiaoSkill({ params, stats, modifier }: TalentProps) {
  return skillDefault({
    element: Element.Anemo,
    params,
    stats,
    modifier,
  });
}

function xiaoBurst({ params, stats, modifier }: TalentProps) {
  return defaultTalentFn();
}
