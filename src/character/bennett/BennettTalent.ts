import { getTalentData, getTalentParams } from '../../data/Data';
import {
  atkBuffValue,
  burstSingle,
  chargedAttackMulti,
  healingValue,
  normalAttackSingle,
  plungeAttack,
  skillMulti,
  skillSingle,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('bennett');

const bennettAttack: Record<string, TalentFn> = {
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
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[2],
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

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[4],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackMulti({
      hits: 2,
      params: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      ).slice(5, 7),
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[8],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[9],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[10],
      stats,
      modifier,
    }),
};

const bennettSkill: Record<string, TalentFn> = {
  pressDmg: ({ stats, modifier }: TalentProps) =>
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

  chargeLevel1Dmg: ({ stats, modifier }: TalentProps) =>
    skillMulti({
      hits: 2,
      element: Element.Pyro,
      params: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      ).slice(1, 3),
      stats,
      modifier,
    }),

  chargeLevel2Dmg: ({ stats, modifier }: TalentProps) =>
    skillMulti({
      hits: 2,
      element: Element.Pyro,
      params: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      ).slice(3, 5),
      stats,
      modifier,
    }),

  explosionDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),
};

const bennettBurst: Record<string, TalentFn> = {
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

  hpRegenContinuousPerSecond: ({ stats, modifier }: TalentProps) =>
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

  atkBonus: ({ stats, modifier }: TalentProps) =>
    atkBuffValue({
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[3],
      stats,
      modifier,
    }),
};

const bennettTalents: Talents = {
  attack: bennettAttack,
  skill: bennettSkill,
  burst: bennettBurst,
};

export default bennettTalents;
