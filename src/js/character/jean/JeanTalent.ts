import { getTalentData } from '../../Data';
import {
  burstSingle,
  chargedAttackSingle,
  healingValue,
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
} from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('jean');

const jeanAttack: Record<string, TalentFn> = {
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
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][2],
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][3],
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
    chargedAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][5],
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

const jeanSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Anemo,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),
};

const jeanBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Anemo,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  fieldEnterExitDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Anemo,
      multiplier: burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),

  fieldActivationHealing: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: burstParams[modifier.talentBurstLevel][2],
      flatHealing: burstParams[modifier.talentBurstLevel][3],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),

  hpRegenContinuous: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: burstParams[modifier.talentBurstLevel][4],
      flatHealing: burstParams[modifier.talentBurstLevel][5],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),
};

const jeanTalents: Talents = {
  attack: jeanAttack,
  skill: jeanSkill,
  burst: jeanBurst,
};

export default jeanTalents;
