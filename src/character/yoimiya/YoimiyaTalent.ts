import { getTalentData, getTalentParams } from '../../data/Data';
import DamageModifier from '../../modifier/DamageModifer';
import {
  aimShot,
  aimShotCharged,
  burstSingle,
  normalAttackMulti,
  normalAttackSingle,
  plungeAttack,
} from '../../talent/TalentUtil';
import {
  TalentProps,
  Element,
  TalentFn,
  Talents,
  TalentType,
} from '../../talent/types';

const talentData = getTalentData('yoimiya');

const yoimiyaAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: Array(2).fill(
        getYoimiyaNormalAttackMultiplier(
          getTalentParams(
            TalentType.Attack,
            modifier.talentAttackLevel,
            talentData
          )[0],
          modifier
        )
      ),
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getYoimiyaNormalAttackMultiplier(
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[1],
        modifier
      ),
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getYoimiyaNormalAttackMultiplier(
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[2],
        modifier
      ),
      stats,
      modifier,
    }),

  '4HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: Array(2).fill(
        getYoimiyaNormalAttackMultiplier(
          getTalentParams(
            TalentType.Attack,
            modifier.talentAttackLevel,
            talentData
          )[3],
          modifier
        )
      ),
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getYoimiyaNormalAttackMultiplier(
        getTalentParams(
          TalentType.Attack,
          modifier.talentAttackLevel,
          talentData
        )[4],
        modifier
      ),
      stats,
      modifier,
    }),

  aimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShot({
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[5],
      stats,
      modifier,
    }),

  chargedAimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Attack,
        modifier.talentAttackLevel,
        talentData
      )[6],
      stats,
      modifier,
    }),

  kindlingArrowDmg: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Pyro,
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

const yoimiyaBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[0],
      stats,
      modifier,
    }),

  aurousBlazeExplosionDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: getTalentParams(
        TalentType.Burst,
        modifier.talentBurstLevel,
        talentData
      )[1],
      stats,
      modifier,
    }),
};

const yoimiyaTalents: Talents = {
  attack: yoimiyaAttack,
  burst: yoimiyaBurst,
};

export default yoimiyaTalents;

// Helper functions

function getYoimiyaNormalAttackMultiplier(
  multiplier: number,
  modifier: DamageModifier
): number {
  if (!modifier.yoimiyaSkill) {
    return multiplier;
  }

  return (
    multiplier *
    getTalentParams(TalentType.Skill, modifier.talentSkillLevel, talentData)[3]
  );
}
