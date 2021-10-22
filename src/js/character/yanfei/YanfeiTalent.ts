import { getTalentData } from '../../Data';
import {
  normalAttackSingle,
  chargedAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('yanfei');

const yanfeiAttack: Record<string, TalentFn> = {
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

  chargedDmgSeal0: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][3],
      stats,
      modifier,
    }),

  chargedDmgSeal1: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][4],
      stats,
      modifier,
    }),

  chargedDmgSeal2: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  chargedDmgSeal3: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  chargedDmgSeal4: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][7],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][15],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][16],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][17],
      stats,
      modifier,
    }),
};

const yanfeiSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Pyro,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),
};

const yanfeiBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),
};

const yanfeiTalents: Talents = {
  attack: yanfeiAttack,
  skill: yanfeiSkill,
  burst: yanfeiBurst,
};

export default yanfeiTalents;
