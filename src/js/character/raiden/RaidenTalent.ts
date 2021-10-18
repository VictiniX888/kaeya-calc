import { getTalentData } from '../../Data';
import DamageModifier from '../../modifier/DamageModifer';
import {
  normalAttackSingle,
  chargedAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
  normalAttackMulti,
  burstMulti,
} from '../../talent/TalentUtil';
import { TalentProps, Element, Talents, TalentFn } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('raiden');

const raidenAttack: Record<string, TalentFn> = {
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
    normalAttackMulti({
      hits: 2,
      params: attackParams[modifier.talentAttackLevel].slice(3, 5),
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: attackParams[modifier.talentAttackLevel][6],
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

const raidenSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: skillParams[modifier.talentSkillLevel][0],
      stats,
      modifier,
    }),

  coordinatedAtkDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: skillParams[modifier.talentSkillLevel][1],
      stats,
      modifier,
    }),
};

const raidenBurst: Record<string, TalentFn> = {
  musouNoHitotachiDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        burstParams[modifier.talentBurstLevel][0] +
        getInitialResolveBonus(modifier),
      stats,
      modifier,
    }),

  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        burstParams[modifier.talentBurstLevel][4] +
        getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        burstParams[modifier.talentBurstLevel][5] +
        getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        burstParams[modifier.talentBurstLevel][6] +
        getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    burstMulti({
      hits: 2,
      element: Element.Electro,
      params: burstParams[modifier.talentBurstLevel]
        .slice(7, 9)
        .map((multiplier) => multiplier + getAttackResolveBonus(modifier)),
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        burstParams[modifier.talentBurstLevel][9] +
        getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    burstMulti({
      hits: 2,
      element: Element.Electro,
      params: burstParams[modifier.talentBurstLevel]
        .slice(10, 12)
        .map((multiplier) => multiplier + getAttackResolveBonus(modifier)),
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        burstParams[modifier.talentBurstLevel][13] +
        getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        burstParams[modifier.talentBurstLevel][14] +
        getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        burstParams[modifier.talentBurstLevel][15] +
        getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),
};

const raidenTalents: Talents = {
  attack: raidenAttack,
  skill: raidenSkill,
  burst: raidenBurst,
};

export default raidenTalents;

// Helper functions

function getInitialResolveBonus(modifier: DamageModifier): number {
  return (
    burstParams[modifier.talentBurstLevel][1] * (modifier.resolveStacks ?? 0)
  );
}

function getAttackResolveBonus(modifier: DamageModifier): number {
  return (
    burstParams[modifier.talentBurstLevel][2] * (modifier.resolveStacks ?? 0)
  );
}
