import { getTalentData } from '../../Data';
import {
  normalAttackSingle,
  chargedAttackSingle,
  plungeAttack,
  burstSingle,
  skillSingle,
  shieldHpValue,
  healingValue,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  ScalingType,
} from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('noelle');

const noelleAttack: Record<string, TalentFn> = {
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

  chargedSpinDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][4],
      stats,
      modifier,
    }),

  chargedFinalDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][8],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][9],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][10],
      stats,
      modifier,
    }),
};

const noelleSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Geo,
      multiplier: skillParams[modifier.talentSkillLevel][5],
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  shieldHp: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      element: Element.Geo,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      flatBonus: skillParams[modifier.talentSkillLevel][6],
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  healing: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: skillParams[modifier.talentSkillLevel][1],
      flatHealing: skillParams[modifier.talentSkillLevel][7],
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),
};

const noelleBurst: Record<string, TalentFn> = {
  burstInitDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Geo,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  firstSwingDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Geo,
      multiplier: burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),
};

const noelleTalents: Talents = {
  attack: noelleAttack,
  skill: noelleSkill,
  burst: noelleBurst,
};

export default noelleTalents;
