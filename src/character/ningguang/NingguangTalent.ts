import { getTalentData, getTalentParams } from '../../data/Data';
import {
  burstSingle,
  chargedAttackSingle,
  hpValue,
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

const talentData = getTalentData('ningguang');

const ningguangAttack: Record<string, TalentFn> = {
  normalAtkDmg: ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),

  starJadeDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[2],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[4],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[6],
      stats,
      modifier,
    }),
};

const ningguangSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),

  jadeScreenHp: ({ stats, modifier }: TalentProps) =>
    hpValue({
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[2],
      flatBonus: 0,
      stats,
      modifier,
    }),
};

const ningguangBurst: Record<string, TalentFn> = {
  dmgPerGem: ({ stats, modifier }: TalentProps) =>
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
};

const ningguangTalents: Talents = {
  attack: ningguangAttack,
  skill: ningguangSkill,
  burst: ningguangBurst,
};

export default ningguangTalents;
