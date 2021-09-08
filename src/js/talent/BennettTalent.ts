import Talent from './Talent';
import {
  attackLightMulti,
  skillBase,
  skillMultiBase,
  burstBase,
  healingSkillBase,
  baseAtkBuff,
} from './TalentUtil';
import { TalentProps, Element } from './types';

const bennettTalent: Talent = {
  attack: bennettAttack,
  skill: bennettSkill,
  burst: bennettBurst,
};

export default bennettTalent;

function bennettAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 1, 1],
    chargedHits: 2,
    params,
    stats,
    modifier,
  });
}

function bennettSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'pressDmg',
      element: Element.Pyro,
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillMultiBase({
      description: 'chargeLevel1Dmg',
      hits: 2,
      element: Element.Pyro,
      params: params.slice(1, 3),
      stats,
      modifier,
    }),

    skillMultiBase({
      description: 'chargeLevel2Dmg',
      hits: 2,
      element: Element.Pyro,
      params: params.slice(3, 5),
      stats,
      modifier,
    }),

    skillBase({
      description: 'explosionDmg',
      element: Element.Pyro,
      multiplier: params[5],
      stats,
      modifier,
    }),
  ];
}

function bennettBurst({ params, stats, modifier }: TalentProps) {
  let talentDamage = [
    burstBase({
      description: 'burstDmg',
      element: Element.Pyro,
      multiplier: params[0],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenContinuousPerSecond',
      params: params.slice(1, 3),
      stats,
      modifier,
    }),

    baseAtkBuff({
      multiplier: params[3],
      stats,
      modifier,
    }),
  ];

  return talentDamage;
}
