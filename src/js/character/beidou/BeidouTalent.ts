import { getTalentData } from '../../Data';
import {
  normalAttackSingle,
  plungeAttack,
  chargedAttackSingle,
  shieldHpValue,
  skillSingle,
  burstSingle,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('beidou');

const beidouAttack: Record<string, TalentFn> = {
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

  chargedSpinDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  chargedFinalDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][9],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][10],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][11],
      stats,
      modifier,
    }),
};

const beidouSkill: Record<string, TalentFn> = {
  shieldHp: ({ stats, modifier }: TalentProps) =>
    shieldHpValue({
      multiplier: skillParams[modifier.talentSkillLevel][0],
      flatBonus: skillParams[modifier.talentSkillLevel][1],
      element: Element.Electro,
      stats,
      modifier,
    }),

  baseDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: skillParams[modifier.talentSkillLevel][2],
      stats,
      modifier,
    }),

  dmgBonusOnHitTaken: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: skillParams[modifier.talentSkillLevel][3],
      stats,
      modifier,
    }),
};

const beidouBurst: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  lightningDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier: burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),
};

const beidouTalents: Talents = {
  attack: beidouAttack,
  skill: beidouSkill,
  burst: beidouBurst,
};

export default beidouTalents;
