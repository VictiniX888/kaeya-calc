import { getTalentData, getTalentParams } from '../../data/Data';
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
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('raiden');

const raidenAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[2],
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      ).slice(3, 5),
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[6],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[8],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[9],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[10],
      stats,
      modifier,
    }),
};

const raidenSkill: Record<string, TalentFn> = {
  skillDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  coordinatedAtkDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Electro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),
};

const raidenBurst: Record<string, TalentFn> = {
  musouNoHitotachiDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[0] + getInitialResolveBonus(modifier),
      stats,
      modifier,
    }),

  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[4] + getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[5] + getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[6] + getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    burstMulti({
      hits: 2,
      element: Element.Electro,
      params: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )
        .slice(7, 9)
        .map((multiplier) => multiplier + getAttackResolveBonus(modifier)),
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[9] + getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    burstMulti({
      hits: 2,
      element: Element.Electro,
      params: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )
        .slice(10, 12)
        .map((multiplier) => multiplier + getAttackResolveBonus(modifier)),
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[13] + getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[14] + getAttackResolveBonus(modifier),
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Electro,
      multiplier:
        getTalentParams(
          TalentType.Burst,
          modifier.talentBurstLevel,
          talentData
        )[15] + getAttackResolveBonus(modifier),
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
    getTalentParams(
      TalentType.Burst,
      modifier.talentBurstLevel,
      talentData
    )[1] * (modifier.resolveStacks ?? 0)
  );
}

function getAttackResolveBonus(modifier: DamageModifier): number {
  return (
    getTalentParams(
      TalentType.Burst,
      modifier.talentBurstLevel,
      talentData
    )[2] * (modifier.resolveStacks ?? 0)
  );
}
