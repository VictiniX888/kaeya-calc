import { getTalentData } from '../../Data';
import DamageModifier from '../../modifier/DamageModifer';
import {
  aimShot,
  aimShotCharged,
  burstSingle,
  normalAttackMulti,
  normalAttackSingle,
  plungeAttack,
} from '../../talent/TalentUtil';
import { TalentProps, Element, TalentFn, Talents } from '../../talent/types';

const {
  attack: attackParams,
  skill: skillParams,
  burst: burstParams,
} = getTalentData('yoimiya');

const yoimiyaAttack: Record<string, TalentFn> = {
  '1HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackMulti({
      hits: 2,
      params: Array(2).fill(
        getYoimiyaNormalAttackMultiplier(
          attackParams[modifier.talentAttackLevel][0],
          modifier
        )
      ),
      stats,
      modifier,
    }),

  '2HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getYoimiyaNormalAttackMultiplier(
        attackParams[modifier.talentAttackLevel][1],
        modifier
      ),
      stats,
      modifier,
    }),

  '3HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getYoimiyaNormalAttackMultiplier(
        attackParams[modifier.talentAttackLevel][2],
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
          attackParams[modifier.talentAttackLevel][3],
          modifier
        )
      ),
      stats,
      modifier,
    }),

  '5HitDmg': ({ stats, modifier }: TalentProps) =>
    normalAttackSingle({
      multiplier: getYoimiyaNormalAttackMultiplier(
        attackParams[modifier.talentAttackLevel][4],
        modifier
      ),
      stats,
      modifier,
    }),

  aimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShot({
      multiplier: attackParams[modifier.talentAttackLevel][5],
      stats,
      modifier,
    }),

  chargedAimShotDmg: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Pyro,
      multiplier: attackParams[modifier.talentAttackLevel][6],
      stats,
      modifier,
    }),

  kindlingArrowDmg: ({ stats, modifier }: TalentProps) =>
    aimShotCharged({
      element: Element.Pyro,
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

const yoimiyaBurst: Record<string, TalentFn> = {
  burstDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: burstParams[modifier.talentBurstLevel][0],
      stats,
      modifier,
    }),

  aurousBlazeExplosionDmg: ({ stats, modifier }: TalentProps) =>
    burstSingle({
      element: Element.Pyro,
      multiplier: burstParams[modifier.talentBurstLevel][1],
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

  return multiplier * skillParams[modifier.talentSkillLevel][3];
}
