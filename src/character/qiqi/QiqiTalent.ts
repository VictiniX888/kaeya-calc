import { getTalentData, getTalentParams } from '../../data/Data';
import {
  normalAttackSingle,
  chargedAttackMulti,
  plungeAttack,
  normalAttackMulti,
  skillSingle,
  healingValue,
  burstSingle,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  TalentFn,
  Talents,
  Element,
  ScalingType,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('qiqi');

const qiqiAttack: Record<string, TalentFn> = {
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
    normalAttackMulti({
      hits: 2,
      params: Array(2).fill(
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[3]
      ),
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
      params: Array(2).fill(
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[5]
      ),
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[7],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[8],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[9],
      stats,
      modifier,
    }),
};

const qiqiSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Cryo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[7],
      stats,
      modifier,
    }),

  heraldOfFrostDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Cryo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[4],
      stats,
      modifier,
    }),

  hpRegenOnHit: ({ stats, modifier }: TalentProps) =>
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
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),

  hpRegenContinuous: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[2],
      flatHealing: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[3],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),
};

const qiqiBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Cryo,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[2],
      stats,
      modifier,
    }),

  healing: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      flatHealing: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[1],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),
};

const qiqiTalents: Talents = {
  attack: qiqiAttack,
  skill: qiqiSkill,
  burst: qiqiBurst,
};

export default qiqiTalents;
