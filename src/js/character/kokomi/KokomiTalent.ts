import { Stats } from '../../../data/types';
import { getTalentData } from '../../Data';
import DamageModifier from '../../modifier/DamageModifer';
import {
  burstSingle,
  chargedAttackSingle,
  healingValue,
  normalAttackSingle,
  plungeAttack,
  skillSingle,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  ScalingType,
} from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('kokomi');

const kokomiAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][0],
      stats,
      modifier: getKokomiNormalAttackModifier(stats, modifier),
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][1],
      stats,
      modifier: getKokomiNormalAttackModifier(stats, modifier),
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][2],
      stats,
      modifier: getKokomiNormalAttackModifier(stats, modifier),
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][3],
      stats,
      modifier: getKokomiChargedAttackModifier(stats, modifier),
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][7],
      stats,
      modifier,
    }),
};

const kokomiSkill: Record<string, TalentFn> = {
  hpRegen: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: skillParams[modifier.talentSkillLevel][0],
      flatHealing: skillParams[modifier.talentSkillLevel][1],
      stats,
      modifier,
    }),

  rippleDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Hydro,
      multiplier: skillParams[modifier.talentSkillLevel][2],
      stats,
      modifier: getKokomiSkillModifier(stats, modifier),
    }),
};

const kokomiBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Hydro,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      scalingType: ScalingType.Hp,
      stats,
      modifier,
    }),

  hpRegenOnHit: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: burstParams[modifier.talentBurstLevel][1],
      flatHealing: burstParams[modifier.talentBurstLevel][2],
      stats,
      modifier,
    }),
};

const kokomiTalents: Talents = {
  attack: kokomiAttack,
  skill: kokomiSkill,
  burst: kokomiBurst,
};

export default kokomiTalents;

// Helper functions

function getKokomiNormalAttackModifier(
  stats: Stats,
  modifier: DamageModifier
): DamageModifier {
  if (!modifier.kokomiBurst) {
    return modifier;
  }

  const newModifier = { ...modifier };
  const normalAttackBonusDmg =
    (burstParams[newModifier.talentBurstLevel][3] +
      (newModifier.kokomiHealingBonusDmg ?? 0) * (stats.healingBonus ?? 0)) *
    stats.flatHp;

  newModifier.normalAttackFlatDmg =
    normalAttackBonusDmg + (newModifier.normalAttackFlatDmg ?? 0);

  return newModifier;
}

function getKokomiChargedAttackModifier(
  stats: Stats,
  modifier: DamageModifier
): DamageModifier {
  if (!modifier.kokomiBurst) {
    return modifier;
  }

  const newModifier = { ...modifier };
  const chargedAttackBonusDmg =
    (burstParams[newModifier.talentBurstLevel][4] +
      (newModifier.kokomiHealingBonusDmg ?? 0) * (stats.healingBonus ?? 0)) *
    stats.flatHp;

  newModifier.chargedAttackFlatDmg =
    chargedAttackBonusDmg + (newModifier.chargedAttackFlatDmg ?? 0);

  return newModifier;
}

function getKokomiSkillModifier(
  stats: Stats,
  modifier: DamageModifier
): DamageModifier {
  if (!modifier.kokomiBurst) {
    return modifier;
  }

  const newModifier = { ...modifier };
  const skillBonusDmg =
    burstParams[newModifier.talentBurstLevel][8] * stats.flatHp;
  newModifier.skillFlatDmg = skillBonusDmg + (newModifier.skillFlatDmg ?? 0);

  return newModifier;
}
