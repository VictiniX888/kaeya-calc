import { Stats } from '../../data/types';
import { getTalentData, getTalentParams } from '../../data/Data';
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
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('kokomi');

const kokomiAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[0],
      stats,
      modifier: getKokomiNormalAttackModifier(stats, modifier),
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[1],
      stats,
      modifier: getKokomiNormalAttackModifier(stats, modifier),
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[2],
      stats,
      modifier: getKokomiNormalAttackModifier(stats, modifier),
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[3],
      stats,
      modifier: getKokomiChargedAttackModifier(stats, modifier),
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[6],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[7],
      stats,
      modifier,
    }),
};

const kokomiSkill: Record<string, TalentFn> = {
  hpRegen: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[0],
      flatHealing: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),

  rippleDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[2],
      stats,
      modifier: getKokomiSkillModifier(stats, modifier),
    }),
};

const kokomiBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      scalingType: ScalingType.Hp,
      stats,
      modifier,
    }),

  hpRegenOnHit: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[1],
      flatHealing: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[2],
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
    (getTalentParams(
      TalentType.Burst,
      newModifier.talentBurstLevel,
      talentData
    )[3] +
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
    (getTalentParams(
      TalentType.Burst,
      newModifier.talentBurstLevel,
      talentData
    )[4] +
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
    getTalentParams(
      TalentType.Burst,
      newModifier.talentBurstLevel,
      talentData
    )[8] * stats.flatHp;
  newModifier.skillFlatDmg = skillBonusDmg + (newModifier.skillFlatDmg ?? 0);

  return newModifier;
}
