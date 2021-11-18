import { Stats, TalentParams } from '../data/types';
import { AttackType, Element, ScalingType, TalentValue } from './types';
import Resistance from '../stat/Resistance';
import DamageModifier from '../modifier/DamageModifer';
import Reaction from '../modifier/Reaction';
import CritType from '../modifier/CritType';

// Helper functions

function getDamageBonus({
  stats,
  element,
  attackType,
}: {
  stats: Stats;
  element: Element;
  attackType: AttackType;
}) {
  let dmgBonus = 1;
  dmgBonus += stats.dmgBonus ?? 0;
  dmgBonus += stats[`${element}DmgBonus`] ?? 0;
  dmgBonus += stats[`${attackType}DmgBonus`] ?? 0;

  return dmgBonus;
}

function calculateBaseDamage({
  stats,
  multiplier,
  scalingType,
  flatDmg = 0,
}: {
  stats: Stats;
  multiplier: number;
  scalingType: ScalingType;
  flatDmg?: number;
}) {
  if (scalingType === ScalingType.Attack) {
    return stats.flatAtk * multiplier + flatDmg;
  } else if (scalingType === ScalingType.Defense) {
    return stats.flatDef * multiplier + flatDmg;
  } else if (scalingType === ScalingType.Hp) {
    return stats.flatHp * multiplier + flatDmg;
  } else {
    return NaN;
  }
}

export function calculateResMultiplier({
  element,
  res = new Resistance(),
  resReduction = new Resistance(),
}: {
  element: Element;
  res?: Resistance;
  resReduction?: Resistance;
}) {
  let totalRes = res.get(element) - resReduction.get(element);

  if (totalRes < 0) {
    return 1 - totalRes / 2;
  } else if (totalRes < 0.75) {
    return 1 - totalRes;
  } else {
    return 1 / (4 * totalRes + 1);
  }
}

function calculateAmplifyingStrengthMultiplier(
  reaction: Reaction,
  triggerElement: Element
) {
  if (reaction === Reaction.Melt) {
    if (triggerElement === Element.Pyro) {
      return 2;
    } else if (triggerElement === Element.Cryo) {
      return 1.5;
    } else return 1;
  } else if (reaction === Reaction.Vaporize) {
    if (triggerElement === Element.Hydro) {
      return 2;
    } else if (triggerElement === Element.Pyro) {
      return 1.5;
    } else return 1;
  } else return 1;
}

function calculateAmplifyingReactionMultiplier({
  reaction,
  stats,
  element,
}: {
  reaction: Reaction;
  stats: Stats;
  element: Element;
}) {
  const amplifyingStrength = calculateAmplifyingStrengthMultiplier(
    reaction,
    element
  );

  if (amplifyingStrength > 1) {
    // Calculate reactionbonus
    let reactionBonus = 0;
    switch (reaction) {
      case Reaction.Vaporize:
        reactionBonus = stats.vaporizeDmgBonus ?? 0;
        break;
      case Reaction.Melt:
        reactionBonus = stats.meltDmgBonus ?? 0;
        break;
      default:
        break;
    }

    // Calculate amplifying reaction multiplier
    const elementalMastery = stats.elementalMastery ?? 0;
    const baseMultiplier =
      1 + (2.78 * elementalMastery) / (1400 + elementalMastery) + reactionBonus;
    return amplifyingStrength * baseMultiplier;
  } else {
    return 1;
  }
}

export function calculateTotalDamage({
  stats,
  multiplier,
  element,
  scalingType = ScalingType.Attack,
  attackType,
  modifier,
}: {
  stats: Stats;
  multiplier: number;
  element: Element;
  scalingType?: ScalingType;
  attackType: AttackType;
  modifier: DamageModifier;
}) {
  let flatDmg = modifier.flatDmg;
  if (attackType === AttackType.Normal) {
    flatDmg += modifier.normalAttackFlatDmg ?? 0;
  } else if (attackType === AttackType.Charged) {
    flatDmg += modifier.chargedAttackFlatDmg ?? 0;
  } else if (attackType === AttackType.Skill) {
    flatDmg += modifier.skillFlatDmg ?? 0;
  }

  let baseDmg = calculateBaseDamage({
    stats,
    multiplier,
    scalingType,
    flatDmg,
  });
  let dmgBonus = getDamageBonus({ stats, element, attackType });

  let crit = 1;
  if (modifier.critType === CritType.Crit) {
    crit += stats.critDmg;
  } else if (modifier.critType === CritType.Average) {
    let critRate = stats.critRate;
    if (attackType === AttackType.Charged) {
      critRate += stats.chargedCritRate ?? 0;
    } else if (attackType === AttackType.Burst) {
      critRate += stats.burstCritRate ?? 0;
    }
    crit += Math.min(1, critRate) * stats.critDmg;
  }

  let enemyDefMultiplier =
    (modifier.characterLevel + 100) /
    (modifier.characterLevel +
      100 +
      (modifier.enemyLevel + 100) * (1 - modifier.enemyDefReduction));
  let enemyResMultiplier = calculateResMultiplier({
    element,
    res: modifier.enemyRes,
    resReduction: modifier.enemyResReduction,
  });

  const reactionMultiplier = calculateAmplifyingReactionMultiplier({
    reaction: modifier.reaction,
    stats,
    element,
  });

  return (
    baseDmg *
    dmgBonus *
    crit *
    enemyDefMultiplier *
    enemyResMultiplier *
    reactionMultiplier
  );
}

function calculateHealing({
  stats,
  multiplier,
  flatHealing,
  scalingType = ScalingType.Hp,
}: {
  stats: Stats;
  multiplier: number;
  flatHealing: number;
  scalingType?: ScalingType;
}) {
  const baseHealing = calculateBaseDamage({
    stats,
    multiplier,
    scalingType,
    flatDmg: flatHealing,
  });

  // Incoming healing bonus is ignored because the healer's
  // incoming healing bonus is not necessarily the same as the
  // character being healed
  return baseHealing * (1 + (stats.healingBonus ?? 0));
}

// Used for calculting hp of summons/shield
function calculateHp({
  stats,
  multiplier,
  flatBonus,
  scalingType = ScalingType.Hp,
}: {
  stats: Stats;
  multiplier: number;
  flatBonus: number;
  scalingType?: ScalingType;
}) {
  if (scalingType === ScalingType.Attack) {
    return stats.flatAtk * multiplier + flatBonus;
  } else if (scalingType === ScalingType.Defense) {
    return stats.flatDef * multiplier + flatBonus;
  } else if (scalingType === ScalingType.Hp) {
    return stats.flatHp * multiplier + flatBonus;
  } else {
    return NaN;
  }
}

// Used for calculating total shield strength
function calculateDmgAbsorption({
  stats,
  multiplier,
  flatBonus,
  element,
  scalingType = ScalingType.Hp,
  modifier,
}: {
  stats: Stats;
  multiplier: number;
  flatBonus: number;
  element: Element;
  scalingType?: ScalingType;
  modifier: DamageModifier;
}) {
  let dmgAbsorption = calculateHp({
    stats,
    multiplier,
    flatBonus,
    scalingType,
  });

  // Geo Shields
  if (element === Element.Geo) dmgAbsorption *= 1.5;

  // Shield bonus from external sources
  if (stats.shieldStrength !== undefined)
    dmgAbsorption *= 1 + stats.shieldStrength;

  // Character-specific bonuses
  // Diona Hold Skill
  if (modifier.dionaHoldSkill) dmgAbsorption *= 1.75;

  return dmgAbsorption;
}

// Functions to calculate Talent Values

// Used for all single-hit normal attacks
export function normalAttackSingle({
  element,
  multiplier,
  stats,
  modifier,
}: {
  element?: Element;
  multiplier: number;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  element =
    element ?? modifier.infusionNormal ?? modifier.infusion ?? Element.Physical;

  const damage = calculateTotalDamage({
    stats,
    multiplier,
    element,
    attackType: AttackType.Normal,
    modifier,
  });

  return {
    damage: [damage],
    element,
  };
}

// Used for all multi-hit normal attacks
export function normalAttackMulti({
  hits,
  element,
  params,
  stats,
  modifier,
}: {
  hits: number;
  element?: Element;
  params: number[];
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  element =
    element ?? modifier.infusionNormal ?? modifier.infusion ?? Element.Physical;

  const damages = [];
  for (let i = 0; i < hits; i++) {
    const damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: AttackType.Normal,
      modifier,
    });
    damages.push(damage);
  }

  return {
    damage: damages,
    element,
  };
}

// Used for single-hit charged attacks
export function chargedAttackSingle({
  element,
  multiplier,
  stats,
  modifier,
}: {
  element?: Element;
  multiplier: number;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  element = element ?? modifier.infusion ?? Element.Physical;

  const damage = calculateTotalDamage({
    stats,
    multiplier,
    element,
    attackType: AttackType.Charged,
    modifier,
  });

  return {
    damage: [damage],
    element,
  };
}

// Used for all multi-hit charged attacks
export function chargedAttackMulti({
  hits,
  element,
  params,
  stats,
  modifier,
}: {
  hits: number;
  element?: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  element = element ?? modifier.infusion ?? Element.Physical;

  const damages = [];
  for (let i = 0; i < hits; i++) {
    const damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: AttackType.Charged,
      modifier,
    });
    damages.push(damage);
  }

  return {
    damage: damages,
    element,
  };
}

// Used for uncharged aim shots
export function aimShot({
  multiplier,
  stats,
  modifier,
}: {
  multiplier: number;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const element = modifier.infusion ?? Element.Physical;

  const damage = calculateTotalDamage({
    stats,
    multiplier,
    element,
    attackType: AttackType.Charged,
    modifier,
  });

  return {
    damage: [damage],
    element,
  };
}

// Used for charged aim shots
export function aimShotCharged({
  element,
  multiplier,
  stats,
  modifier,
}: {
  element: Element;
  multiplier: number;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const damage = calculateTotalDamage({
    stats,
    multiplier: multiplier,
    element,
    attackType: AttackType.Charged,
    modifier,
  });

  return {
    damage: [damage],
    element,
  };
}

// Used for all physical plunge attacks
export function plungeAttack({
  element,
  multiplier,
  stats,
  modifier,
}: {
  element?: Element;
  multiplier: number;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  element =
    element ?? modifier.infusionPlunge ?? modifier.infusion ?? Element.Physical;

  const damage = calculateTotalDamage({
    stats,
    multiplier,
    element,
    attackType: AttackType.Plunge,
    modifier,
  });

  return {
    damage: [damage],
    element,
  };
}

// Used for all single-hit skill dmg
export function skillSingle({
  element,
  multiplier,
  scalingType,
  stats,
  modifier,
}: {
  element: Element;
  multiplier: number;
  scalingType?: ScalingType;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const damage = calculateTotalDamage({
    stats,
    multiplier,
    element,
    scalingType,
    attackType: AttackType.Skill,
    modifier,
  });

  return {
    damage: [damage],
    element,
  };
}

// Used for all multi-hit skills
export function skillMulti({
  hits,
  element,
  params,
  stats,
  modifier,
}: {
  hits: number;
  element: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  const damages = [];

  for (let i = 0; i < hits; i++) {
    damages.push(
      calculateTotalDamage({
        element,
        multiplier: params[i],
        attackType: AttackType.Skill,
        stats,
        modifier,
      })
    );
  }

  return {
    damage: damages,
    element,
  };
}

// Used for all single-hit burst dmg
export function burstSingle({
  element,
  multiplier,
  scalingType,
  stats,
  modifier,
}: {
  element: Element;
  multiplier: number;
  scalingType?: ScalingType;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const damage = calculateTotalDamage({
    element,
    multiplier,
    scalingType,
    attackType: AttackType.Burst,
    stats,
    modifier,
  });

  return {
    damage: [damage],
    element,
  };
}

// Used for all multi-hit bursts
export function burstMulti({
  hits,
  element,
  params,
  stats,
  modifier,
}: {
  hits: number;
  element: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  const damages = [];

  for (let i = 0; i < hits; i++) {
    damages.push(
      calculateTotalDamage({
        element,
        multiplier: params[i],
        attackType: AttackType.Burst,
        stats,
        modifier,
      })
    );
  }

  return {
    damage: damages,
    element,
  };
}

// Used for damage that does not have an AttackType
export function typelessAttack({
  element,
  multiplier,
  stats,
  modifier,
}: {
  element: Element;
  multiplier: number;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const damage = calculateTotalDamage({
    stats,
    multiplier,
    element,
    attackType: AttackType.None,
    modifier,
  });

  return {
    damage: [damage],
    element,
  };
}

// Used for healing skills/bursts
export function healingValue({
  multiplier,
  flatHealing,
  scalingType = ScalingType.Hp,
  stats,
  modifier,
}: {
  multiplier: number;
  flatHealing: number;
  scalingType?: ScalingType;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const healing = calculateHealing({
    stats,
    multiplier,
    flatHealing,
    scalingType,
  });

  return {
    damage: [healing],
  };
}

// Used for all summons HP
export function hpValue({
  multiplier,
  flatBonus,
  scalingType = ScalingType.Hp,
  stats,
  modifier,
}: {
  multiplier: number;
  flatBonus: number;
  scalingType?: ScalingType;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const hp = calculateHp({
    stats,
    multiplier,
    flatBonus,
    scalingType,
  });

  return {
    damage: [hp],
  };
}

// Used for all shields
export function shieldHpValue({
  multiplier,
  flatBonus,
  element,
  scalingType = ScalingType.Hp,
  stats,
  modifier,
}: {
  multiplier: number;
  flatBonus: number;
  element: Element;
  scalingType?: ScalingType;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const dmgAbsorption = calculateDmgAbsorption({
    stats,
    multiplier,
    flatBonus,
    element,
    scalingType,
    modifier,
  });

  return {
    damage: [dmgAbsorption],
  };
}

// Used for Bennett and Sara's ATK buffs
export function atkBuffValue({
  multiplier,
  stats,
  modifier,
}: {
  multiplier: number;
  stats: Stats;
  modifier: DamageModifier;
}): TalentValue {
  const atkBonus = stats.baseAtk * multiplier;
  return {
    damage: [atkBonus],
  };
}
