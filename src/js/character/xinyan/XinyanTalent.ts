import { getTalentData } from '../../Data';
import {
  normalAttackSingle,
  chargedAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
  shieldHpValue,
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
} = getTalentData('xinyan');

const xinyanAttack: Record<string, TalentFn> = {
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

const xinyanSkill: Record<string, TalentFn> = {
  swingDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),

  shieldHpLevel1: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      multiplier: skillParams[modifier.talentSkillLevel][1],
      flatBonus: skillParams[modifier.talentSkillLevel][2],
      element: Element.Pyro,
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  shieldHpLevel2: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      multiplier: skillParams[modifier.talentSkillLevel][3],
      flatBonus: skillParams[modifier.talentSkillLevel][4],
      element: Element.Pyro,
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  shieldHpLevel3: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      multiplier: skillParams[modifier.talentSkillLevel][5],
      flatBonus: skillParams[modifier.talentSkillLevel][6],
      element: Element.Pyro,
      scalingType: ScalingType.Defense,
      stats,
      modifier,
    }),

  dot: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][7],
      stats,
      modifier,
    }),
};

const xinyanBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Physical,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  pyroDot: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),
};

const xinyanTalents: Talents = {
  attack: xinyanAttack,
  skill: xinyanSkill,
  burst: xinyanBurst,
};

export default xinyanTalents;
