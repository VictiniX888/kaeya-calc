import Talent from './Talent';
import {
  attackBowDefault,
  baseAtkBuff,
  burstBase,
  skillBase,
} from './TalentUtil';
import { Element, TalentProps } from './types';

const saraTalent: Talent = {
  attack: saraAttack,
  skill: saraSkill,
  burst: saraBurst,
};

export default saraTalent;

function saraAttack({ params, stats, modifier }: TalentProps) {
  return attackBowDefault({
    normalHits: 5,
    chargedElement: Element.Electro,
    params,
    stats,
    modifier,
  });
}

function saraSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'tenguJuuraiAmbushDmg',
      element: Element.Electro,
      multiplier: params[0],
      stats,
      modifier,
    }),

    baseAtkBuff({
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

function saraBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'tenguJuuraiTitanbreakerDmg',
      element: Element.Electro,
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'tenguJuuraiStormclusterDmg',
      element: Element.Electro,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}
