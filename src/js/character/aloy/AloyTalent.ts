import { Element, TalentFn, TalentProps, Talents } from '../../talent/types';
import {
  aimShot,
  aimShotCharged,
  burstSingle,
  normalAttackMulti,
  normalAttackSingle,
  plungeAttack,
  skillSingle,
} from '../../talent/TalentUtil';
import { getTalentData } from '../../Data';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('aloy');

const aloyAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: attackParams[modifier.talentAttackLevel].slice(0, 2),
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][2],
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][3],
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][4],
      stats,
      modifier,
    }),

  aimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShot({
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  chargedAimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Cryo,
      multiplier: attackParams[modifier.talentAttackLevel][6],
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

const aloySkill: Record<string, TalentFn> = {
  freezeBombDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Cryo,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),

  chillwaterBombletDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Cryo,
      multiplier: skillParams[modifier.talentSkillLevel][1],
      stats,
      modifier,
    }),
};

const aloyBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Cryo,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),
};

const aloyTalents: Talents = {
  attack: aloyAttack,
  skill: aloySkill,
  burst: aloyBurst,
};

export default aloyTalents;
