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
} = getTalentData('razor');

const razorAttack: Record<string, TalentFn> = {
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

  chargedSpinDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][4],
      stats,
      modifier,
    }),

  chargedFinalDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][5],
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

const razorSkill: Record<string, TalentFn> = {
  pressDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),

  holdDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: skillParams[modifier.talentSkillLevel][1],
      stats,
      modifier,
    }),
};

const razorBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  '1HitDmgSoulCompanion': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        attackParams[modifier.talentAttackLevel][0] *
        burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),

  '2HitDmgSoulCompanion': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        attackParams[modifier.talentAttackLevel][1] *
        burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),

  '3HitDmgSoulCompanion': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        attackParams[modifier.talentAttackLevel][2] *
        burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),

  '4HitDmgSoulCompanion': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        attackParams[modifier.talentAttackLevel][3] *
        burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),
};

const razorTalents: Talents = {
  attack: razorAttack,
  skill: razorSkill,
  burst: razorBurst,
};

export default razorTalents;
