import { getTalentData } from '../../Data';
import {
  aimShot,
  aimShotCharged,
  burstSingle,
  healingValue,
  normalAttackSingle,
  plungeAttack,
  shieldHpValue,
  skillSingle,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('diona');

const dionaAttack: Record<string, TalentFn> = {
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

  aimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShot({
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  chargedAimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Cryo,
      multiplier: attackParams[modifier.talentAttackLevel][7],
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

const dionaSkill: Record<string, TalentFn> = {
  icyPawDmgPerPaw: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Cryo,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),

  shieldHpPress: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      multiplier: skillParams[modifier.talentSkillLevel][1],
      flatBonus: skillParams[modifier.talentSkillLevel][2],
      element: Element.Cryo,
      stats,
      modifier,
    }),

  shieldHpHold: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      multiplier: skillParams[modifier.talentSkillLevel][1],
      flatBonus: skillParams[modifier.talentSkillLevel][2],
      element: Element.Cryo,
      stats,
      modifier: { ...modifier, dionaHoldSkill: true },
    }),
};

const dionaBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Cryo,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  continuousFieldDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Cryo,
      multiplier: burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),

  hpRegenContinuousTime: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: burstParams[modifier.talentBurstLevel][2],
      flatHealing: burstParams[modifier.talentBurstLevel][3],
      stats,
      modifier,
    }),
};

const dionaTalents: Talents = {
  attack: dionaAttack,
  skill: dionaSkill,
  burst: dionaBurst,
};

export default dionaTalents;
