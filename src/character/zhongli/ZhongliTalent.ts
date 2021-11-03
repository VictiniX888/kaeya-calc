import { getTalentData, getTalentParams } from '../../data/Data';
import {
  normalAttackSingle,
  chargedAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
  normalAttackMulti,
  shieldHpValue,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('zhongli');

const zhongliAttack: Record<string, TalentFn> = {
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
    normalAttackMulti({
      hits: 4,
      params: Array(4).fill(
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[4]
      ),
      stats,
      modifier,
    }),

  '6HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[6],
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

const zhongliSkill: Record<string, TalentFn> = {
  stoneSteeleDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  resonanceDmg: ({ stats, modifier }: TalentProps) =>
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

  holdDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Geo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[3],
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
      )[5],
      flatBonus: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[4],
      stats,
      modifier,
    }),
};

const zhongliBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
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

const zhongliTalents: Talents = {
  attack: zhongliAttack,
  skill: zhongliSkill,
  burst: zhongliBurst,
};

export default zhongliTalents;
