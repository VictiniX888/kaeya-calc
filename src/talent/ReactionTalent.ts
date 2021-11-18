import { getReactionCurveAt } from '../data/Data';
import { Stats } from '../data/types';
import DamageModifier from '../modifier/DamageModifer';
import { calculateResMultiplier } from './TalentUtil';
import { Element, TalentFn, TalentProps, TalentValue } from './types';

const reactionTalents: Record<string, TalentFn> = {
  superconduct: ({ stats, modifier }: TalentProps) =>
    reactionTalent({
      multiplier: 1,
      reactionBonus: stats.superconductDmgBonus,
      element: Element.Cryo,
      stats,
      modifier,
    }),

  swirl: ({ stats, modifier }: TalentProps) =>
    modifier.swirlElement
      ? reactionTalent({
          multiplier: 1.2,
          reactionBonus: stats.swirlDmgBonus,
          element: modifier.swirlElement,
          stats,
          modifier,
        })
      : { damage: [NaN] },

  electrocharged: ({ stats, modifier }: TalentProps) =>
    reactionTalent({
      multiplier: 2.4,
      reactionBonus: stats.electrochargedDmgBonus,
      element: Element.Electro,
      stats,
      modifier,
    }),

  shatter: ({ stats, modifier }: TalentProps) =>
    reactionTalent({
      multiplier: 3,
      reactionBonus: stats.shatterDmgBonus,
      element: Element.Physical,
      stats,
      modifier,
    }),

  overload: ({ stats, modifier }: TalentProps) =>
    reactionTalent({
      multiplier: 4,
      reactionBonus: stats.overloadDmgBonus,
      element: Element.Pyro,
      stats,
      modifier,
    }),
};

export default reactionTalents;

// Helper functions

function reactionTalent({
  multiplier,
  reactionBonus,
  element,
  stats,
  modifier,
}: {
  multiplier: number;
  reactionBonus?: number;
  element: Element;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const damage = calculateReactionDamage({
    multiplier,
    reactionBonus,
    element,
    stats,
    modifier,
  });

  return { damage: [damage], element };
}

function calculateReactionDamage({
  multiplier,
  reactionBonus,
  element,
  stats,
  modifier,
}: {
  multiplier: number;
  reactionBonus?: number;
  element: Element;
  stats: Stats;
  modifier: DamageModifier;
}): number {
  const levelMultiplier = getReactionLevelMultiplier(modifier.characterLevel);
  const enemyResMultiplier = calculateResMultiplier({
    element,
    res: modifier.enemyRes,
    resReduction: modifier.enemyResReduction,
  });

  const elementalMastery = stats.elementalMastery ?? 0;
  const baseMultiplier =
    1 +
    (16 * elementalMastery) / (2000 + elementalMastery) +
    (reactionBonus ?? 0);

  return multiplier * baseMultiplier * levelMultiplier * enemyResMultiplier;
}

function getReactionLevelMultiplier(level: number): number {
  const reactionCurveData = getReactionCurveAt(level);
  return reactionCurveData?.multiplier ?? NaN;
}
