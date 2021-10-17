import { getTalentData } from '../../Data';
import {
  skillSingle,
  burstSingle,
  chargedAttackCatalyst,
  normalAttackCatalyst,
  plungeAttackCatalyst,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('klee');

const kleeAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackCatalyst({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][0],
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackCatalyst({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][1],
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackCatalyst({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][2],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackCatalyst({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][3],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttackCatalyst({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttackCatalyst({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttackCatalyst({
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
