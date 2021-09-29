import { getTalentData, getTalentStatsAt } from '../Data';
import Talent from './Talent';
import {
  attackLightDefault,
  calculateTotalDamage,
  healingSkillBase,
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
  let newModifier = { ...modifier };

  if (newModifier.kokomiBurst) {
    const burstParams = getTalentStatsAt(
      TalentType.Burst,
      newModifier.talentBurstLevel,
      getTalentData('kokomi')
    );

    const normalAttackBonusDmg =
      (burstParams[3] +
        (newModifier.kokomiHealingBonusDmg ?? 0) * (stats.healingBonus ?? 0)) *
      stats.flatHp;

    newModifier.normalAttackFlatDmg =
      normalAttackBonusDmg + (newModifier.normalAttackFlatDmg ?? 0);

    const chargedAttackBonusDmg =
      (burstParams[4] +
        (newModifier.kokomiHealingBonusDmg ?? 0) * (stats.healingBonus ?? 0)) *
      stats.flatHp;

    newModifier.chargedAttackFlatDmg =
      chargedAttackBonusDmg + (newModifier.chargedAttackFlatDmg ?? 0);
  }

  return attackLightDefault({
    normalHits: 3,
    element: Element.Hydro,
    params,
    stats,
    modifier: newModifier,
  });
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

  let newModifier = { ...modifier };

  if (newModifier.kokomiBurst) {
    const burstParams = getTalentStatsAt(
      TalentType.Burst,
      newModifier.talentBurstLevel,
      getTalentData('kokomi')
    );

    const skillBonusDmg = burstParams[8] * stats.flatHp;
    newModifier.skillFlatDmg = skillBonusDmg + (newModifier.skillFlatDmg ?? 0);
  }

  let rippleDmg = skillBase({
    description: 'rippleDmg',
    element: Element.Hydro,
    multiplier: params[2],
    stats,
    modifier: newModifier,
  });
  talentValues.push(rippleDmg);

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
