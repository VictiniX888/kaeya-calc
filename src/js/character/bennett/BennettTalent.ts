import { getTalentData } from '../../Data';
import {
  atkBuffValue,
  burstSingle,
  chargedAttackMulti,
  healingValue,
  normalAttackSingle,
  plungeAttack,
  skillMulti,
  skillSingle,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('bennett');

const bennettAttack: Record<string, TalentFn> = {
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
    chargedAttackMulti({
      hits: 2,
      params: attackParams[modifier.talentAttackLevel].slice(5, 7),
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

const bennettSkill: Record<string, TalentFn> = {
  pressDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),

  chargeLevel1Dmg: ({ stats, modifier }: TalentProps) =>
    skillMulti({
      hits: 2,
      element: Element.Pyro,
      params: skillParams[modifier.talentSkillLevel].slice(1, 3),
      stats,
      modifier,
    }),

  chargeLevel2Dmg: ({ stats, modifier }: TalentProps) =>
    skillMulti({
      hits: 2,
      element: Element.Pyro,
      params: skillParams[modifier.talentSkillLevel].slice(3, 5),
      stats,
      modifier,
    }),

  explosionDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][5],
      stats,
      modifier,
    }),
};

const bennettBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  hpRegenContinuousPerSecond: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: burstParams[modifier.talentBurstLevel][1],
      flatHealing: burstParams[modifier.talentBurstLevel][2],
      stats,
      modifier,
    }),

  atkBonus: ({ stats, modifier }: TalentProps) =>
    atkBuffValue({
      multiplier: burstParams[modifier.talentBurstLevel][3],
      stats,
      modifier,
    }),
};

const bennettTalents: Talents = {
  attack: bennettAttack,
  skill: bennettSkill,
  burst: bennettBurst,
};

export default bennettTalents;
