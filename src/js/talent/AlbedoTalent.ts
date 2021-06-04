import Talent from './Talent';
import {
  attackLightMulti,
  skillBase,
  calculateTotalDamage,
  burstBase,
} from './TalentUtil';
import { TalentProps, ScalingType, AttackType, Element } from './types';

const albedoTalent: Talent = {
  attack: albedoAttack,
  skill: albedoSkill,
  burst: albedoBurst,
};

export default albedoTalent;

function albedoAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 1, 1],
    chargedHits: 2,
    params,
    stats,
    modifier,
  });
}

function albedoSkill({ params, stats, modifier }: TalentProps) {
  let talentDmg = [];

  talentDmg.push(
    skillBase({
      description: 'skillDmg',
      element: Element.Geo,
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  let transientBlossomDmg = calculateTotalDamage({
    stats,
    multiplier: params[1],
    element: Element.Geo,
    scalingType: ScalingType.Defense,
    attackType: AttackType.Skill,
    modifier,
  });
  talentDmg.push({
    description: 'transientBlossomDmg',
    damage: [transientBlossomDmg],
  });

  return talentDmg;
}

function albedoBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'burstDmg',
      element: Element.Geo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'fatalBlossomDmg',
      element: Element.Geo,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}
