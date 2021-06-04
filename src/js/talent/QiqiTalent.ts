import Talent from './Talent';
import {
  attackLightMulti,
  skillBase,
  healingSkillBase,
  burstBase,
} from './TalentUtil';
import { TalentProps, ScalingType, Element } from './types';

const qiqiTalent: Talent = {
  attack: qiqiAttack,
  skill: qiqiSkill,
  burst: qiqiBurst,
};

export default qiqiTalent;

function qiqiAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 2, 2, 1],
    chargedHits: 2,
    params: params.slice(0, 6).concat(params[5]).concat(params.slice(6)),
    stats,
    modifier,
  });
}

function qiqiSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'skillDmg',
      element: Element.Cryo,
      multiplier: params[7],
      stats,
      modifier,
    }),

    skillBase({
      description: 'heraldOfFrostDmg',
      element: Element.Cryo,
      multiplier: params[4],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenOnHit',
      scalingType: ScalingType.Attack,
      params: params.slice(0, 2),
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenContinuous',
      scalingType: ScalingType.Attack,
      params: params.slice(2, 4),
      stats,
      modifier,
    }),
  ];
}

function qiqiBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'burstDmg',
      element: Element.Cryo,
      multiplier: params[2],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'healing',
      scalingType: ScalingType.Attack,
      params,
      stats,
      modifier,
    }),
  ];
}
