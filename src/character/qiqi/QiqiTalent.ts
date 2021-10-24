import { getTalentData } from '../../data/Data';
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
} from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('qiqi');

const qiqiAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][0],
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][1],
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: Array(2).fill(attackParams[modifier.talentAttackLevel][2]),
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: Array(2).fill(attackParams[modifier.talentAttackLevel][3]),
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][4],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackMulti({
      hits: 2,
      params: Array(2).fill(attackParams[modifier.talentAttackLevel][5]),
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][7],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][8],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][9],
      stats,
      modifier,
    }),
};

const qiqiSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Cryo,
      multiplier: skillParams[modifier.talentSkillLevel][7],
      stats,
      modifier,
    }),

  heraldOfFrostDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Cryo,
      multiplier: skillParams[modifier.talentSkillLevel][4],
      stats,
      modifier,
    }),

  hpRegenOnHit: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: skillParams[modifier.talentSkillLevel][0],
      flatHealing: skillParams[modifier.talentSkillLevel][1],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),

  hpRegenContinuous: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: skillParams[modifier.talentSkillLevel][2],
      flatHealing: skillParams[modifier.talentSkillLevel][3],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),
};

const qiqiBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Cryo,
      multiplier: burstParams[modifier.talentBurstLevel][2],
      stats,
      modifier,
    }),

  healing: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: burstParams[modifier.talentBurstLevel][0],
      flatHealing: burstParams[modifier.talentBurstLevel][1],
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
