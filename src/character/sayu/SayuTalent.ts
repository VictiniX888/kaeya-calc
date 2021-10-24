import { getTalentData } from '../../data/Data';
import {
  burstSingle,
  chargedAttackSingle,
  healingValue,
  normalAttackMulti,
  normalAttackSingle,
  plungeAttack,
  skillSingle,
} from '../../talent/TalentUtil';
import {
  Element,
  ScalingType,
  TalentFn,
  TalentProps,
  Talents,
} from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('sayu');

const sayuAttack: Record<string, TalentFn> = {
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

const sayuSkill: Record<string, TalentFn> = {
  fuufuuWindwheelDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Anemo,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),

  fuufuuWhirlwindKickPressDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Anemo,
      multiplier: skillParams[modifier.talentSkillLevel][2],
      stats,
      modifier,
    }),

  fuufuuWhirlwindKickHoldDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Anemo,
      multiplier: skillParams[modifier.talentSkillLevel][3],
      stats,
      modifier,
    }),

  fuufuuWindwheelElementalDmg: ({ stats, modifier }: TalentProps) => {
    if (modifier.elementalAbsorption !== undefined) {
      return skillSingle({
        element: modifier.elementalAbsorption,
        multiplier: skillParams[modifier.talentSkillLevel][1],
        stats,
        modifier,
      });
    } else {
      return {
        damage: [NaN],
      };
    }
  },

  fuufuuWhirlwindKickElementalDmg: ({ stats, modifier }: TalentProps) => {
    if (modifier.elementalAbsorption !== undefined) {
      return skillSingle({
        element: modifier.elementalAbsorption,
        multiplier: skillParams[modifier.talentSkillLevel][4],
        stats,
        modifier,
      });
    } else {
      return {
        damage: [NaN],
      };
    }
  },
};

const sayuBurst: Record<string, TalentFn> = {
  activationDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Anemo,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  activationHealing: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: burstParams[modifier.talentBurstLevel][2],
      flatHealing: burstParams[modifier.talentBurstLevel][1],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),

  mujimujiDarumaDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Anemo,
      multiplier: burstParams[modifier.talentBurstLevel][3],
      stats,
      modifier,
    }),

  mujimujiDarumaHealing: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: burstParams[modifier.talentBurstLevel][5],
      flatHealing: burstParams[modifier.talentBurstLevel][4],
      scalingType: ScalingType.Attack,
      stats,
      modifier,
    }),
};

const sayuTalents: Talents = {
  attack: sayuAttack,
  skill: sayuSkill,
  burst: sayuBurst,
};

export default sayuTalents;
