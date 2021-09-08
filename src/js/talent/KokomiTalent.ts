import { getTalentData, getTalentStatsAt } from '../Data';
import Talent from './Talent';
import {
  attackLightDefault,
  calculateTotalDamage,
  chargedAttackDefault,
  healingSkillBase,
  normalAttackDefault,
  plungeAttackDefault,
  skillBase,
} from './TalentUtil';
import {
  AttackType,
  Element,
  ScalingType,
  TalentProps,
  TalentType,
  TalentValue,
} from './types';

const kokomiTalent: Talent = {
  attack: kokomiAttack,
  skill: kokomiSkill,
  burst: kokomiBurst,
};

export default kokomiTalent;

function kokomiAttack({ params, stats, modifier }: TalentProps) {
  if (modifier.kokomiBurst) {
    let talentValues = [];

    const burstParams = getTalentStatsAt(
      TalentType.Burst,
      modifier.talentBurstLevel,
      getTalentData('kokomi')
    );

    // Normal attacks
    let normalAttackDmg = normalAttackDefault({
      hits: 3,
      element: Element.Hydro,
      params,
      stats,
      modifier,
    });
    const normalBonusDmg = calculateTotalDamage({
      stats,
      multiplier:
        burstParams[3] +
        (modifier.kokomiHealingBonusDmg ?? 0) * stats.healingBonus,
      element: Element.Hydro,
      scalingType: ScalingType.Hp,
      attackType: AttackType.Normal,
      modifier,
    });
    normalAttackDmg.forEach(
      (talentValue) => (talentValue.damage[0] += normalBonusDmg)
    );

    talentValues.push(...normalAttackDmg);

    // Charged attacks
    let chargedAttackDmg = chargedAttackDefault({
      element: Element.Hydro,
      params: params.slice(3, 4),
      stats,
      modifier,
    });
    const chargedBonusDmg = calculateTotalDamage({
      stats,
      multiplier:
        burstParams[4] +
        (modifier.kokomiHealingBonusDmg ?? 0) * stats.healingBonus,
      element: Element.Hydro,
      scalingType: ScalingType.Hp,
      attackType: AttackType.Charged,
      modifier,
    });
    chargedAttackDmg.forEach(
      (talentValue) => (talentValue.damage[0] += chargedBonusDmg)
    );

    talentValues.push(...chargedAttackDmg);

    // Plunge attacks
    talentValues.push(
      ...plungeAttackDefault({
        element: Element.Hydro,
        params: params.slice(5, 8),
        stats,
        modifier,
      })
    );

    return talentValues;
  } else {
    return attackLightDefault({
      normalHits: 3,
      element: Element.Hydro,
      params,
      stats,
      modifier,
    });
  }
}

function kokomiSkill({ params, stats, modifier }: TalentProps) {
  let talentValues = [];

  talentValues.push(
    healingSkillBase({
      description: 'hpRegen',
      params,
      stats,
      modifier,
    })
  );

  if (modifier.kokomiBurst) {
    const burstParams = getTalentStatsAt(
      TalentType.Burst,
      modifier.talentBurstLevel,
      getTalentData('kokomi')
    );

    let rippleDmg = skillBase({
      description: 'rippleDmg',
      element: Element.Hydro,
      multiplier: params[2],
      stats,
      modifier,
    });
    const bonusDmg = calculateTotalDamage({
      stats,
      multiplier: burstParams[8],
      element: Element.Hydro,
      scalingType: ScalingType.Hp,
      attackType: AttackType.Skill,
      modifier,
    });
    rippleDmg.damage[0] += bonusDmg;

    talentValues.push(rippleDmg);
  } else {
    talentValues.push(
      skillBase({
        description: 'rippleDmg',
        element: Element.Hydro,
        multiplier: params[2],
        stats,
        modifier,
      })
    );
  }

  return talentValues;
}

function kokomiBurst({ params, stats, modifier }: TalentProps) {
  let talentValues: TalentValue[] = [];

  let burstDmg = calculateTotalDamage({
    element: Element.Hydro,
    multiplier: params[0],
    attackType: AttackType.Burst,
    scalingType: ScalingType.Hp,
    stats,
    modifier,
  });
  talentValues.push({
    description: 'burstDmg',
    damage: [burstDmg],
  });

  talentValues.push(
    healingSkillBase({
      description: 'hpRegenOnHit',
      params: params.slice(1, 3),
      stats,
      modifier,
    })
  );

  return talentValues;
}
