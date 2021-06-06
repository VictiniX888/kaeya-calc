import { Stats, TalentParams } from '../../data/types';
import {
  AttackType,
  Element,
  ScalingType,
  TalentType,
  TalentValue,
} from './types';
import Resistance from '../Resistance';
import DamageModifier from '../modifier/DamageModifer';
import { talents } from './Talent';

// Function to get specified talent
export function getTalentFn(characterId: string, type: TalentType) {
  return talents[characterId]?.[type] ?? talents.defaultTalent[type];
}

// Functions to calculate Talent Values
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
function calculateResMultiplier({
  element,
  res = new Resistance({}),
  resReduction = new Resistance({}),
}: {
  element: Element;
  res?: Resistance;
  resReduction?: Resistance;
}) {
  let totalRes = res[element] - resReduction[element];

  if (totalRes < 0) {
    return 1 - totalRes / 2;
  } else if (totalRes < 0.75) {
    return 1 - totalRes;
  } else {
    return 1 / (4 * totalRes + 1);
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
  let baseDmg = calculateBaseDamage({
    stats,
    multiplier,
    scalingType,
    flatDmg: modifier.flatDmg,
  });
  let dmgBonus = getDamageBonus({ stats, element, attackType });

  let crit = 1;
  if (modifier.critType === 'crit') {
    crit += stats.critDmg;
  } else if (modifier.critType === 'average') {
    let critRate = stats.critRate;
    if (attackType === 'charged') {
      critRate += stats.chargedCritRate ?? 0;
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

  // TODO: reactionBonus
  return baseDmg * dmgBonus * crit * enemyDefMultiplier * enemyResMultiplier;
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
  // TODO: Add healing bonus
  return calculateBaseDamage({
    stats,
    multiplier,
    scalingType,
    flatDmg: flatHealing,
  });
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
// Used for all default normal attacks
export function normalAttackDefault({
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
  let talentValues: TalentValue[] = [];
  for (let i = 0; i < hits; i++) {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: AttackType.Normal,
      modifier,
    });

    talentValues.push({
      description: `${i + 1}HitDmg`,
      damage: [damage],
    });
  }

  return talentValues;
}
// Used for all normal attacks with multiple damage instances in 1 hit e.g. polearms
export function normalAttackMulti({
  hits = [],
  element,
  params,
  stats,
  modifier,
}: {
  hits?: number[];
  element: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let talentValues = hits.map((hitCount, i) => {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: AttackType.Normal,
      modifier,
    });

    let damages = [];
    for (let hit = 0; hit < hitCount; hit++) {
      damages.push(damage);
    }

    return {
      description: `${i + 1}HitDmg`,
      damage: damages,
    } as TalentValue;
  });

  return talentValues;
}
// Used for all 1-hit charged attacks
export function chargedAttackDefault({
  element,
  params,
  stats,
  modifier,
}: {
  element: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let damage = calculateTotalDamage({
    stats,
    multiplier: params[0],
    element,
    attackType: AttackType.Charged,
    modifier,
  });

  return [
    {
      description: 'chargedDmg',
      damage: [damage],
    },
  ] as TalentValue[];
}
// Used for multi-hit charged attacks
export function chargedAttackMulti({
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
  let damages = [];
  for (let i = 0; i < hits; i++) {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: AttackType.Charged,
      modifier,
    });
    damages.push(damage);
  }

  return [
    {
      description: `chargedDmg`,
      damage: damages,
    },
  ] as TalentValue[];
}
// Used for all default claymore charged attacks
function chargedAttackHeavy({
  element = Element.Physical,
  params,
  stats,
  modifier,
}: {
  element?: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let descriptions = ['chargedSpinDmg', 'chargedFinalDmg'];
  return descriptions.map((description, i) => {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: AttackType.Charged,
      modifier,
    });

    return {
      description: description,
      damage: [damage],
    } as TalentValue;
  });
}
// Used for all default plunge attacks
export function plungeAttackDefault({
  element,
  params,
  stats,
  modifier,
}: {
  element: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let descriptions = ['plungeDmg', 'lowPlungeDmg', 'highPlungeDmg'];
  return descriptions.map((description, i) => {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: AttackType.Plunge,
      modifier,
    });

    return {
      description: description,
      damage: [damage],
    } as TalentValue;
  });
}
// Used for all default sword/polearm/catalyst attacks
export function attackLightDefault({
  normalHits,
  element = Element.Physical,
  params,
  stats,
  modifier,
}: {
  normalHits: number;
  element?: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let talentValues = [];

  talentValues.push(
    ...normalAttackDefault({
      hits: normalHits,
      element,
      params: params.slice(0, normalHits),
      stats,
      modifier,
    })
  );

  talentValues.push(
    ...chargedAttackDefault({
      element,
      params: params.slice(normalHits, normalHits + 1),
      stats,
      modifier,
    })
  );

  talentValues.push(
    ...plungeAttackDefault({
      element,
      params: params.slice(normalHits + 1 + 1),
      stats,
      modifier,
    })
  );

  return talentValues;
}
// Used for all default sword/polearm attacks with multi damage instances
export function attackLightMulti({
  normalHits = [],
  chargedHits = 1,
  element = Element.Physical,
  params,
  stats,
  modifier,
}: {
  normalHits?: number[];
  chargedHits?: number;
  element?: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let talentValues = [];

  talentValues.push(
    ...normalAttackMulti({
      hits: normalHits,
      element,
      params: params.slice(0, normalHits.length),
      stats,
      modifier,
    })
  );

  if (chargedHits === 1) {
    talentValues.push(
      ...chargedAttackDefault({
        element,
        params: params.slice(normalHits.length, normalHits.length + 1),
        stats,
        modifier,
      })
    );
  } else {
    talentValues.push(
      ...chargedAttackMulti({
        hits: chargedHits,
        element,
        params: params.slice(
          normalHits.length,
          normalHits.length + chargedHits
        ),
        stats,
        modifier,
      })
    );
  }

  talentValues.push(
    ...plungeAttackDefault({
      element,
      params: params.slice(normalHits.length + chargedHits + 1),
      stats,
      modifier,
    })
  );

  return talentValues;
}
// Used for all default claymore attacks
export function attackHeavyDefault({
  normalHits,
  element = Element.Physical,
  params,
  stats,
  modifier,
}: {
  normalHits: number;
  element?: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let talentValues = [];

  talentValues.push(
    ...normalAttackDefault({
      hits: normalHits,
      element,
      params: params.slice(0, normalHits),
      stats,
      modifier,
    })
  );

  talentValues.push(
    ...chargedAttackHeavy({
      element,
      params: params.slice(normalHits, normalHits + 2),
      stats,
      modifier,
    })
  );

  talentValues.push(
    ...plungeAttackDefault({
      element,
      params: params.slice(normalHits + 2 + 2),
      stats,
      modifier,
    })
  );

  return talentValues;
}
// Used for all claymore attacks with multi damage instances
export function attackHeavyMulti({
  normalHits = [],
  element = Element.Physical,
  params,
  stats,
  modifier,
}: {
  normalHits?: number[];
  element?: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let talentValues = [];

  talentValues.push(
    ...normalAttackMulti({
      hits: normalHits,
      element,
      params: params.slice(0, normalHits.length),
      stats,
      modifier,
    })
  );

  talentValues.push(
    ...chargedAttackHeavy({
      params: params.slice(normalHits.length, normalHits.length + 2),
      stats,
      modifier,
    })
  );

  talentValues.push(
    ...plungeAttackDefault({
      element,
      params: params.slice(normalHits.length + 2 + 2),
      stats,
      modifier,
    })
  );

  return talentValues;
}
// Used for all debault bow aim shots (include charged shots)
function aimShotDefault({
  chargedElement,
  params,
  stats,
  modifier,
}: {
  chargedElement: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let talentValues: TalentValue[] = [];

  let damage = calculateTotalDamage({
    stats,
    multiplier: params[0],
    element: Element.Physical,
    attackType: AttackType.Normal,
    modifier,
  });
  talentValues.push({
    description: 'aimShotDmg',
    damage: [damage],
  });

  damage = calculateTotalDamage({
    stats,
    multiplier: params[1],
    element: chargedElement,
    attackType: AttackType.Charged,
    modifier,
  });
  talentValues.push({
    description: 'chargedAimShotDmg',
    damage: [damage],
  });

  return talentValues;
}
// Used for all default bow attacks
export function attackBowDefault({
  normalHits,
  chargedElement,
  params,
  stats,
  modifier,
}: {
  normalHits: number;
  chargedElement: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let talentValues = [];

  talentValues.push(
    ...normalAttackDefault({
      hits: normalHits,
      element: Element.Physical,
      params: params.slice(0, normalHits),
      stats,
      modifier,
    })
  );

  talentValues.push(
    ...aimShotDefault({
      chargedElement,
      params: params.slice(normalHits, normalHits + 2),
      stats,
      modifier,
    })
  );

  talentValues.push(
    ...plungeAttackDefault({
      element: Element.Physical,
      params: params.slice(normalHits + 2),
      stats,
      modifier,
    })
  );

  return talentValues;
}
// Base function for all damage skills. Returns an object representing a single line to be displayed.
// The returned object should always be added into an array to construct the list of talent damage.
export function skillBase({
  description,
  element,
  multiplier,
  stats,
  modifier,
}: {
  description: string;
  element: Element;
  multiplier: number;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let damage = calculateTotalDamage({
    element,
    multiplier,
    attackType: AttackType.Skill,
    stats,
    modifier,
  });

  return {
    description,
    damage: [damage],
  } as TalentValue;
}
// Used for all default skill that only does 1-hit elemental dmg
export function skillDefault({
  element,
  params,
  stats,
  modifier,
}: {
  element: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  return [
    skillBase({
      description: 'skillDmg',
      element,
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}
// Base function for damage skills with multiple damage instances
export function skillMultiBase({
  description,
  hits,
  element,
  params,
  stats,
  modifier,
}: {
  description: string;
  hits: number;
  element: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let damages = [];

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
    description,
    damage: damages,
  } as TalentValue;
}
// Base function for all damage bursts. Returns an object representing a single line to be displayed.
// The returned object should always be added into an array to construct the list of talent damage.
export function burstBase({
  description,
  element,
  multiplier,
  stats,
  modifier,
}: {
  description: string;
  element: Element;
  multiplier: number;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let damage = calculateTotalDamage({
    element,
    multiplier,
    attackType: AttackType.Burst,
    stats,
    modifier,
  });

  return {
    description,
    damage: [damage],
  } as TalentValue;
}
// Used for all default burst that only does 1-hit elemental dmg
export function burstDefault({
  element,
  params,
  stats,
  modifier,
}: {
  element: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  return [
    burstBase({
      description: 'burstDmg',
      element,
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}
// Base function for bursts with multiple damage instances
export function burstMultiBase({
  description,
  hits,
  element,
  params,
  stats,
  modifier,
}: {
  description: string;
  hits: number;
  element: Element;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let damages = [];

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
    description,
    damage: damages,
  } as TalentValue;
}
// Base function for all healing skills. Returns an object representing a single line to be displayed.
// The returned object should always be added into an array to construct the list of talent damage.
export function healingSkillBase({
  description,
  scalingType = ScalingType.Hp,
  params,
  stats,
  modifier,
}: {
  description: string;
  scalingType?: ScalingType;
  params: TalentParams;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let damage = calculateHealing({
    stats,
    multiplier: params[0],
    flatHealing: params[1],
    scalingType,
  });

  return {
    description,
    damage: [damage],
  } as TalentValue;
}
// Base function for all shields/summon HP
export function hpBase({
  description,
  multiplier,
  flatBonus,
  scalingType = ScalingType.Hp,
  stats,
  modifier,
}: {
  description: string;
  multiplier: number;
  flatBonus: number;
  scalingType?: ScalingType;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let hp = calculateHp({
    stats,
    multiplier,
    flatBonus,
    scalingType,
  });

  return {
    description,
    damage: [hp],
  } as TalentValue;
}
export function shieldBase({
  description,
  multiplier,
  flatBonus,
  element,
  scalingType = ScalingType.Hp,
  stats,
  modifier,
}: {
  description: string;
  multiplier: number;
  flatBonus: number;
  element: Element;
  scalingType?: ScalingType;
  stats: Stats;
  modifier: DamageModifier;
}) {
  let dmgAbsorption = calculateDmgAbsorption({
    stats,
    multiplier,
    flatBonus,
    element,
    scalingType,
    modifier,
  });

  return {
    description,
    damage: [dmgAbsorption],
  } as TalentValue;
}
