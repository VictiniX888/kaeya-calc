import { getTalentData, getTalentParams } from '../../data/Data';
import {
  normalAttackSingle,
  chargedAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('chongyun');

const chongyunAttack: Record<string, TalentFn> = {
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

const chongyunSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Cryo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),
};

const chongyunBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Cryo,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),
};

const chongyunTalents: Talents = {
  attack: chongyunAttack,
  skill: chongyunSkill,
  burst: chongyunBurst,
};

export default chongyunTalents;
