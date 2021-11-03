import { getTalentData, getTalentParams } from '../../data/Data';
import {
  skillSingle,
  burstSingle,
  chargedAttackSingle,
  normalAttackSingle,
  plungeAttack,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('sucrose');

const sucroseAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Anemo,
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
      element: Element.Anemo,
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
      element: Element.Anemo,
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
      element: Element.Anemo,
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
      element: Element.Anemo,
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
      element: Element.Anemo,
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
      element: Element.Anemo,
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
      element: Element.Anemo,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[8],
      stats,
      modifier,
    }),
};

const sucroseSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
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
};

const sucroseBurst: Record<string, TalentFn> = {
  dot: ({ stats, modifier }: TalentProps) =>
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

  dotElementalAbsorption: ({ stats, modifier }: TalentProps) => {
    if (modifier.elementalAbsorption !== undefined) {
      return burstSingle({
        element: modifier.elementalAbsorption,
        multiplier: getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[1],
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

const sucroseTalents: Talents = {
  attack: sucroseAttack,
  skill: sucroseSkill,
  burst: sucroseBurst,
};

export default sucroseTalents;
