import { getTalentData, getTalentParams } from '../../data/Data';
import {
  normalAttackSingle,
  chargedAttackSingle,
  plungeAttack,
  burstSingle,
  skillSingle,
  shieldHpValue,
  healingValue,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  ScalingType,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('noelle');

const noelleAttack: Record<string, TalentFn> = {
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

const noelleSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[5],
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  shieldHp: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[0],
      flatBonus: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[6],
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  healing: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[1],
      flatHealing: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[7],
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),
};

const noelleBurst: Record<string, TalentFn> = {
  burstInitDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  firstSwingDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),
};

const noelleTalents: Talents = {
  attack: noelleAttack,
  skill: noelleSkill,
  burst: noelleBurst,
};

export default noelleTalents;
