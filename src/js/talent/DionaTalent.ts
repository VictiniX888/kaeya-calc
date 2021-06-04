import Talent from './Talent';
import {
  attackBowDefault,
  skillBase,
  shieldBase,
  burstBase,
  healingSkillBase,
} from './TalentUtil';
import { TalentProps, Element } from './types';

const dionaTalent: Talent = {
  attack: dionaAttack,
  skill: dionaSkill,
  burst: dionaBurst,
};

export default dionaTalent;

function dionaAttack({ params, stats, modifier }: TalentProps) {
  return attackBowDefault({
    normalHits: 5,
    chargedElement: Element.Cryo,
    params: params.slice(0, 5).concat(params.slice(6)),
    stats,
    modifier,
  });
}

function dionaSkill({ params, stats, modifier }: TalentProps) {
  let holdModifier = {
    ...modifier,
    dionaHoldSkill: true,
  };

  return [
    skillBase({
      description: 'icyPawDmgPerPaw',
      element: Element.Cryo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    shieldBase({
      description: 'shieldHpPress',
      multiplier: params[1],
      flatBonus: params[2],
      element: Element.Cryo,
      stats,
      modifier,
    }),

    shieldBase({
      description: 'shieldHpHold',
      multiplier: params[1],
      flatBonus: params[2],
      element: Element.Cryo,
      stats,
      modifier: holdModifier,
    }),
  ];
}

function dionaBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'burstDmg',
      element: Element.Cryo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'continuousFieldDmg',
      element: Element.Cryo,
      multiplier: params[1],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenContinuousTime',
      params: params.slice(2),
      stats,
      modifier,
    }),
  ];
}
