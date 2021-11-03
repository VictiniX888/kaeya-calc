import { getTalentData, getTalentParams } from '../../data/Data';
import {
  burstSingle,
  chargedAttackSingle,
  normalAttackSingle,
  plungeAttack,
  skillSingle,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('lisa');

const lisaAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Electro,
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
      element: Element.Electro,
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
      element: Element.Electro,
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
      element: Element.Electro,
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
      element: Element.Electro,
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
      element: Element.Electro,
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
      element: Element.Electro,
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
      element: Element.Electro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[8],
      stats,
      modifier,
    }),
};

const lisaSkill: Record<string, TalentFn> = {
  pressDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),

  holdDmgStack0: ({ stats, modifier }: TalentProps) =>
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

  holdDmgStack1: ({ stats, modifier }: TalentProps) =>
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

  holdDmgStack2: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[2],
      stats,
      modifier,
    }),

  holdDmgStack3: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[3],
      stats,
      modifier,
    }),
};

const lisaBurst: Record<string, TalentFn> = {
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
};

const lisaTalents: Talents = {
  attack: lisaAttack,
  skill: lisaSkill,
  burst: lisaBurst,
};

export default lisaTalents;
