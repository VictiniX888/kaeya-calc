import { getTalentData, getTalentParams } from '../../data/Data';
import {
  normalAttackSingle,
  plungeAttack,
  skillSingle,
  burstSingle,
  aimShot,
  aimShotCharged,
  typelessAttack,
  normalAttackMulti,
  chargedAttackMulti,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  Talents,
  TalentFn,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('tartaglia');

const tartagliaAttack: Record<string, TalentFn> = {
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
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[3],
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[4],
      stats,
      modifier,
    }),

  '6HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),

  aimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShot({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[6],
      stats,
      modifier,
    }),

  chargedAimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[7],
      stats,
      modifier,
    }),

  plungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[10],
      stats,
      modifier,
    }),

  lowPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[11],
      stats,
      modifier,
    }),

  highPlungeDmg: ({ stats, modifier }: TalentProps) =>
    plungeAttack({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[12],
      stats,
      modifier,
    }),

  riptideFlashDmg: ({ stats, modifier }: TalentProps) =>
    typelessAttack({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[8],
      stats,
      modifier,
    }),

  riptideBurstDmg: ({ stats, modifier }: TalentProps) =>
    typelessAttack({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[9],
      stats,
      modifier,
    }),
};

const tartagliaSkill: Record<string, TalentFn> = {
  stanceChangeDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[2],
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[3],
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[4],
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),

  '6HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      element: Element.Hydro,
      params: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      ).slice(6, 8),
      stats,
      modifier,
    }),

  chargedDmg: ({ stats, modifier }: TalentProps) =>
    chargedAttackMulti({
      hits: 2,
      element: Element.Hydro,
      params: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      ).slice(8, 10),
      stats,
      modifier,
    }),

  riptideSlashDmg: ({ stats, modifier }: TalentProps) =>
    skillSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Skill,
        modifier.talentSkillLevel,
        talentData
      )[10],
      stats,
      modifier,
    }),
};

const tartagliaBurst: Record<string, TalentFn> = {
  burstDmgMelee: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  burstDmgRanged: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[2],
      stats,
      modifier,
    }),

  riptideBlastDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Hydro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),
};

const tartagliaTalents: Talents = {
  attack: tartagliaAttack,
  skill: tartagliaSkill,
  burst: tartagliaBurst,
};

export default tartagliaTalents;
