import { getTalentData } from '../../data/Data';
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
import { TalentProps, TalentFn, Talents, Element } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('thoma');

const thomaAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][0],
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][1],
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: Array(2).fill(attackParams[modifier.talentAttackLevel][2]),
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][3],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][4],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][7],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][8],
      stats,
      modifier,
    }),
};

const thomaSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),

  shieldHp: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][1],
      flatBonus: skillParams[modifier.talentSkillLevel][2],
      stats,
      modifier,
    }),

  shieldHpMax: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][4],
      flatBonus: skillParams[modifier.talentSkillLevel][5],
      stats,
      modifier,
    }),
};

const thomaBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  fieryCollapseDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier: getThomaFieryCollapseModifier(stats, modifier),
    }),

  shieldHp: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      element: Element.Pyro,
      multiplier: burstParams[modifier.talentBurstLevel][2],
      flatBonus: burstParams[modifier.talentBurstLevel][3],
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
