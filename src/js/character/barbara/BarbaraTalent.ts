import { getTalentData } from '../../Data';
import {
  chargedAttackCatalyst,
  healingValue,
  normalAttackCatalyst,
  plungeAttack,
  skillSingle,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('barbara');

const barbaraAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackCatalyst({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][0],
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackCatalyst({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][1],
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackCatalyst({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][2],
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackCatalyst({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][3],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackCatalyst({
      element: Element.Hydro,
      multiplier: attackParams[modifier.talentAttackLevel][4],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][7],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: attackParams[modifier.talentAttackLevel][8],
      stats,
      modifier,
    }),
};

const barbaraSkill: Record<string, TalentFn> = {
  hpRegenContinuous: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: skillParams[modifier.talentSkillLevel][0],
      flatHealing: skillParams[modifier.talentSkillLevel][1],
      stats,
      modifier,
    }),

  hpRegenOnHit: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: skillParams[modifier.talentSkillLevel][2],
      flatHealing: skillParams[modifier.talentSkillLevel][3],
      stats,
      modifier,
    }),

  dropletDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Hydro,
      multiplier: skillParams[modifier.talentSkillLevel][4],
      stats,
      modifier,
    }),
};

const barbaraBurst: Record<string, TalentFn> = {
  hpRegen: ({ stats, modifier }: TalentProps) =>
    healingValue({
      multiplier: burstParams[modifier.talentBurstLevel][0],
      flatHealing: burstParams[modifier.talentBurstLevel][1],
      stats,
      modifier,
    }),
};

const barbaraTalents: Talents = {
  attack: barbaraAttack,
  skill: barbaraSkill,
  burst: barbaraBurst,
};

export default barbaraTalents;
