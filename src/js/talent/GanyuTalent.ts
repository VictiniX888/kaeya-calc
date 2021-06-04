import Talent from './Talent';
import {
  normalAttackDefault,
  calculateTotalDamage,
  plungeAttackDefault,
  skillBase,
  hpBase,
  burstBase,
} from './TalentUtil';
import { TalentProps, AttackType, Element } from './types';

const ganyuTalent: Talent = {
  attack: ganyuAttack,
  skill: ganyuSkill,
  burst: ganyuBurst,
};

export default ganyuTalent;

function ganyuAttack({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  // Normal attack
  talentDamage.push(
    ...normalAttackDefault({
      hits: 6,
      element: Element.Physical,
      params,
      stats,
      modifier,
    })
  );

  // Charged attack
  let aimedShotDmg = calculateTotalDamage({
    stats,
    multiplier: params[6],
    element: Element.Physical,
    attackType: AttackType.Normal,
    modifier,
  });
  talentDamage.push({
    description: 'aimShotDmg',
    damage: [aimedShotDmg],
  });

  let chargedDescriptions = [
    'aimShotChargeLevel1',
    'frostflakeArrowDmg',
    'frostflakeArrowBloomDmg',
  ];
  let chargedDmg = chargedDescriptions.map((description, i) => {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i + 7],
      element: Element.Cryo,
      attackType: AttackType.Charged,
      modifier,
    });

    return {
      description,
      damage: [damage],
    };
  });
  talentDamage.push(...chargedDmg);

  talentDamage.push(
    ...plungeAttackDefault({
      element: Element.Physical,
      params: params.slice(10),
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function ganyuSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'skillDmg',
      element: Element.Cryo,
      multiplier: params[1],
      stats,
      modifier,
    }),

    hpBase({
      description: 'iceLotusHp',
      multiplier: params[0],
      flatBonus: 0,
      stats,
      modifier,
    }),
  ];
}

function ganyuBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'iceShardDmg',
      element: Element.Cryo,
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}
