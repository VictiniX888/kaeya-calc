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

const talentData = getTalentData('razor');

const razorAttack: Record<string, TalentFn> = {
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

const razorSkill: Record<string, TalentFn> = {
  pressDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  holdDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),
};

const razorBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  '1HitDmgSoulCompanion': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[0] *
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[1],
      stats,
      modifier,
    }),

  '2HitDmgSoulCompanion': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[1] *
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[1],
      stats,
      modifier,
    }),

  '3HitDmgSoulCompanion': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[2] *
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[1],
      stats,
      modifier,
    }),

  '4HitDmgSoulCompanion': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[3] *
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[1],
      stats,
      modifier,
    }),
};

const razorTalents: Talents = {
  attack: razorAttack,
  skill: razorSkill,
  burst: razorBurst,
};

export default razorTalents;
