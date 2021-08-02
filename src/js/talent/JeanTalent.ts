import Talent from './Talent';
import {
  attackLightDefault,
  burstBase,
  healingSkillBase,
  skillDefault,
} from './TalentUtil';
import { Element, ScalingType, TalentProps } from './types';

const jeanTalent: Talent = {
  attack: jeanAttack,
  skill: jeanSkill,
  burst: jeanBurst,
};

export default jeanTalent;

function jeanAttack({ params, stats, modifier }: TalentProps) {
  return attackLightDefault({ normalHits: 5, params, stats, modifier });
}

function jeanSkill({ params, stats, modifier }: TalentProps) {
  return skillDefault({ element: Element.Anemo, params, stats, modifier });
}

function jeanBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'burstDmg',
      element: Element.Anemo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'fieldEnterExitDmg',
      element: Element.Anemo,
      multiplier: params[1],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'fieldActivationHealing',
      scalingType: ScalingType.Attack,
      params: params.slice(2, 4),
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenContinuous',
      scalingType: ScalingType.Attack,
      params: params.slice(4, 6),
      stats,
      modifier,
    }),
  ];
}
