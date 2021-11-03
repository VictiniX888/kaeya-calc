import { getTalentData, getTalentParams } from '../../data/Data';
import {
  burstSingle,
  chargedAttackSingle,
  healingValue,
  normalAttackMulti,
  normalAttackSingle,
  plungeAttack,
  skillSingle,
} from '../../talent/TalentUtil';
import {
  Element,
  ScalingType,
  TalentFn,
  TalentProps,
  Talents,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('sayu');

const sayuAttack: Record<string, TalentFn> = {
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

  chargedSpinDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),

  chargedFinalDmg: ({ stats, modifier }: TalentProps) =>
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

const sayuSkill: Record<string, TalentFn> = {
  fuufuuWindwheelDmg: ({ stats, modifier }: TalentProps) =>
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

  fuufuuWhirlwindKickPressDmg: ({ stats, modifier }: TalentProps) =>
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

  fuufuuWhirlwindKickHoldDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Anemo,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[3],
      stats,
      modifier,
    }),

  fuufuuWindwheelElementalDmg: ({ stats, modifier }: TalentProps) => {
    if (modifier.elementalAbsorption !== undefined) {
      return skillSingle({
        element: modifier.elementalAbsorption,
        multiplier: getTalentParams(
          TalentType.Skill,
          modifier.talentSkillLevel,
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

  fuufuuWhirlwindKickElementalDmg: ({ stats, modifier }: TalentProps) => {
    if (modifier.elementalAbsorption !== undefined) {
      return skillSingle({
        element: modifier.elementalAbsorption,
        multiplier: getTalentParams(
          TalentType.Skill,
          modifier.talentSkillLevel,
          talentData
        )[4],
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

const sayuBurst: Record<string, TalentFn> = {
  activationDmg: ({ stats, modifier }: TalentProps) =>
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

  activationHealing: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[2],
      flatHealing: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[1],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),

  mujimujiDarumaDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Anemo,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[3],
      stats,
      modifier,
    }),

  mujimujiDarumaHealing: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[5],
      flatHealing: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[4],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),
};

const sayuTalents: Talents = {
  attack: sayuAttack,
  skill: sayuSkill,
  burst: sayuBurst,
};

export default sayuTalents;
