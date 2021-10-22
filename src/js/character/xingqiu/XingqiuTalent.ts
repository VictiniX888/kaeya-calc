import { getTalentData } from '../../Data';
import {
  normalAttackSingle,
  chargedAttackMulti,
  plungeAttack,
  burstSingle,
  normalAttackMulti,
  skillMulti,
} from '../../talent/TalentUtil';
import { TalentProps, TalentFn, Talents, Element } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('xingqiu');

const xingqiuAttack: Record<string, TalentFn> = {
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
      params: attackParams[modifier.talentAttackLevel].slice(2, 4),
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][4],
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: attackParams[modifier.talentAttackLevel].slice(5, 7),
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackMulti({
      hits: 2,
      params: attackParams[modifier.talentAttackLevel].slice(7, 9),
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][10],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][11],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][12],
      stats,
      modifier,
    }),
};

const xingqiuSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillMulti({
      hits: 2,
      element: Element.Hydro,
      params: skillParams[modifier.talentSkillLevel].slice(0, 2),
      stats,
      modifier,
    }),
};

const xingqiuBurst: Record<string, TalentFn> = {
  swordRainDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Hydro,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),
};

const xingqiuTalents: Talents = {
  attack: xingqiuAttack,
  skill: xingqiuSkill,
  burst: xingqiuBurst,
};

export default xingqiuTalents;
