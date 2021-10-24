import { getTalentData } from '../../data/Data';
import {
  burstSingle,
  chargedAttackSingle,
  hpValue,
  normalAttackSingle,
  plungeAttack,
  skillSingle,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('ningguang');

const ningguangAttack: Record<string, TalentFn> = {
  normalAtkDmg: ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Geo,
      multiplier: attackParams[modifier.talentAttackLevel][0],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Geo,
      multiplier: attackParams[modifier.talentAttackLevel][1],
      stats,
      modifier,
    }),

  starJadeDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Geo,
      multiplier: attackParams[modifier.talentAttackLevel][2],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Geo,
      multiplier: attackParams[modifier.talentAttackLevel][4],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Geo,
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Geo,
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),
};

const ningguangSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Geo,
      multiplier: skillParams[modifier.talentSkillLevel][1],
      stats,
      modifier,
    }),

  jadeScreenHp: ({ stats, modifier }: TalentProps) =>
    hpValue({
      multiplier: skillParams[modifier.talentSkillLevel][2],
      flatBonus: 0,
      stats,
      modifier,
    }),
};

const ningguangBurst: Record<string, TalentFn> = {
  dmgPerGem: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Geo,
      multiplier: burstParams[modifier.talentBurstLevel][0],
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
