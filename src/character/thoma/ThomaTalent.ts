import { getTalentData, getTalentParams } from '../../data/Data';
import { Stats } from '../../data/types';
import DamageModifier from '../../modifier/DamageModifer';
import {
  normalAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
  normalAttackMulti,
  chargedAttackSingle,
  shieldHpValue,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  TalentFn,
  Talents,
  Element,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('thoma');

const thomaAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: Array(2).fill(
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[2]
      ),
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[3],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[4],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[6],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[7],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[8],
      stats,
      modifier,
    }),
};

const thomaSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  shieldHp: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[1],
      flatBonus: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[2],
      stats,
      modifier,
    }),

  shieldHpMax: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[4],
      flatBonus: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),
};

const thomaBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  fieryCollapseDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[1],
      stats,
      modifier: getThomaFieryCollapseModifier(stats, modifier),
    }),

  shieldHp: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[2],
      flatBonus: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[3],
      stats,
      modifier,
    }),
};

const thomaTalents: Talents = {
  attack: thomaAttack,
  skill: thomaSkill,
  burst: thomaBurst,
};

export default thomaTalents;

// Helper functions

function getThomaFieryCollapseModifier(
  stats: Stats,
  modifier: DamageModifier
): DamageModifier {
  if (!modifier.thomaHpBonusDmg) {
    return modifier;
  }

  const flatDmg = modifier.thomaHpBonusDmg * stats.flatHp + modifier.flatDmg;

  return { ...modifier, flatDmg };
}
