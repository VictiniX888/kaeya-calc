import Talent from './Talent';
import {
  attackHeavyDefault,
  calculateTotalDamage,
  shieldBase,
  healingSkillBase,
  burstBase,
} from './TalentUtil';
import { TalentProps, ScalingType, AttackType, Element } from './types';

const noelleTalent: Talent = {
  attack: noelleAttack,
  skill: noelleSkill,
  burst: noelleBurst,
};

export default noelleTalent;

function noelleAttack({ params, stats, modifier }: TalentProps) {
  const element = modifier.infusion ?? Element.Physical;

  return attackHeavyDefault({
    normalHits: 4,
    element,
    params,
    stats,
    modifier,
  });
}

function noelleSkill({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  let skillDamage = calculateTotalDamage({
    stats,
    multiplier: params[5],
    element: Element.Geo,
    scalingType: ScalingType.Defense,
    attackType: AttackType.Skill,
    modifier,
  });
  talentDamage.push({
    description: 'skillDmg',
    damage: [skillDamage],
  });

  talentDamage.push(
    shieldBase({
      description: 'shieldHp',
      multiplier: params[0],
      flatBonus: params[6],
      element: Element.Geo,
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    })
  );

  talentDamage.push(
    healingSkillBase({
      description: 'healing',
      params: [params[1], params[7]],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function noelleBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'burstInitDmg',
      element: Element.Geo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'firstSwingDmg',
      element: Element.Geo,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}
