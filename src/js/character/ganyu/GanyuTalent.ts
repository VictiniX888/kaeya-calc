import { getTalentData } from '../../Data';
import {
  normalAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
  aimShot,
  aimShotCharged,
  hpValue,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('ganyu');

const ganyuAttack: Record<string, TalentFn> = {
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

  '6HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  aimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShot({
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  aimShotChargeLevel1: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Cryo,
      multiplier: attackParams[modifier.talentAttackLevel][7],
      stats,
      modifier,
    }),

  frostflakeArrowDmg: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Cryo,
      multiplier: attackParams[modifier.talentAttackLevel][8],
      stats,
      modifier,
    }),

  frostflakeArrowBloomDmg: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Cryo,
      multiplier: attackParams[modifier.talentAttackLevel][9],
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

const ganyuSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Cryo,
      multiplier: skillParams[modifier.talentSkillLevel][1],
      stats,
      modifier,
    }),

  iceLotusHp: ({ stats, modifier }: TalentProps) =>
    hpValue({
      multiplier: skillParams[modifier.talentSkillLevel][0],
      flatBonus: 0,
      stats,
      modifier,
    }),
};

const ganyuBurst: Record<string, TalentFn> = {
  iceShardDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Cryo,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),
};

const ganyuTalents: Talents = {
  attack: ganyuAttack,
  skill: ganyuSkill,
  burst: ganyuBurst,
};

export default ganyuTalents;
