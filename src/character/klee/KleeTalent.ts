import { getTalentData } from '../../data/Data';
import {
  skillSingle,
  burstSingle,
  chargedAttackSingle,
  normalAttackSingle,
  plungeAttack,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('klee');

const kleeAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][0],
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][1],
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][2],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][3],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][7],
      stats,
      modifier,
    }),
};

const kleeSkill: Record<string, TalentFn> = {
  jumpyDumptyDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),

  mineDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][3],
      stats,
      modifier,
    }),
};

const kleeBurst: Record<string, TalentFn> = {
  sparksNSplashDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),
};

const kleeTalents: Talents = {
  attack: kleeAttack,
  skill: kleeSkill,
  burst: kleeBurst,
};

export default kleeTalents;
