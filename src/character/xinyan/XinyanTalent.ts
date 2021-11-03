import { getTalentData, getTalentParams } from '../../data/Data';
import {
  normalAttackSingle,
  chargedAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
  shieldHpValue,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  ScalingType,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('xinyan');

const xinyanAttack: Record<string, TalentFn> = {
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

  chargedSpinDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[4],
      stats,
      modifier,
    }),

  chargedFinalDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[5],
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

const xinyanSkill: Record<string, TalentFn> = {
  swingDmg: ({ stats, modifier }: TalentProps) =>
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

  shieldHpLevel1: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
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
      element: Element.Pyro,
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  shieldHpLevel2: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[3],
      flatBonus: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[4],
      element: Element.Pyro,
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  shieldHpLevel3: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[5],
      flatBonus: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[6],
      element: Element.Pyro,
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  dot: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[7],
      stats,
      modifier,
    }),
};

const xinyanBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Physical,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  pyroDot: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),
};

const xinyanTalents: Talents = {
  attack: xinyanAttack,
  skill: xinyanSkill,
  burst: xinyanBurst,
};

export default xinyanTalents;
