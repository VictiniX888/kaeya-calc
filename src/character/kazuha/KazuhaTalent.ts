import { getTalentData, getTalentParams } from '../../data/Data';
import {
  normalAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
  normalAttackMulti,
  chargedAttackMulti,
} from '../../talent/TalentUtil';
import {
  Element,
  TalentFn,
  TalentProps,
  Talents,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('kazuha');

const kazuhaAttack: Record<string, TalentFn> = {
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
      params: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      ).slice(2, 4),
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[4],
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 3,
      params: Array(3).fill(
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[5]
      ),
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
      ).slice(6, 8),
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[9],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[10],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[11],
      stats,
      modifier,
    }),
};

const kazuhaSkill: Record<string, TalentFn> = {
  pressDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Anemo,
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
      element: Element.Anemo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[2],
      stats,
      modifier,
    }),
};

const kazuhaBurst: Record<string, TalentFn> = {
  slashingDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Anemo,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  dot: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Anemo,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),

  dotElementalAbsorption: ({ stats, modifier }: TalentProps) => {
    if (modifier.elementalAbsorption !== undefined) {
      return burstSingle({
        element: modifier.elementalAbsorption,
        multiplier: getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[2],
        stats,
        modifier,
      });
    } else {
      return {
        damage: [NaN],
      };
    }
  },
};

const kazuhaTalents: Talents = {
  attack: kazuhaAttack,
  skill: kazuhaSkill,
  burst: kazuhaBurst,
};

export default kazuhaTalents;
