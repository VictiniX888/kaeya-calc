import { getTalentData, getTalentStatsAt } from './Data.js';
import Resistance from './Resistance.js';

// Placeholder function
export function defaultTalent() {
  return [];
}

// Internal functions

function getDamageBonus({ stats, element, attackType }) {
  let dmgBonus = 1;
  dmgBonus += stats[`${element}DmgBonus`] ?? 0;
  if (attackType === 'normal') {
    dmgBonus += stats.normalDmgBonus ?? 0;
  } else if (attackType === 'charged') {
    dmgBonus += stats.chargedDmgBonus ?? 0;
  } else if (attackType === 'plunge') {
    dmgBonus += stats.plungeDmgBonus ?? 0;
  }

  return dmgBonus;
}

function calculateBaseDamage({ stats, multiplier, scalingType, flatDmg = 0 }) {
  if (scalingType == 'attack') {
    return stats.flatAtk * multiplier + flatDmg;
  } else if (scalingType == 'defense') {
    return stats.flatDef * multiplier + flatDmg;
  } else if (scalingType == 'hp') {
    return stats.flatHp * multiplier + flatDmg;
  } else {
    return NaN;
  }
}

function calculateResMultiplier({
  element,
  res = new Resistance({}),
  resReduction = new Resistance({}),
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

function calculateTotalDamage({
  stats,
  multiplier,
  element,
  scalingType = 'attack',
  attackType = 'none',
  modifier,
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
    crit += Math.min(1, stats.critRate) * stats.critDmg;
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
  scalingType = 'hp',
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
function calculateHp({ stats, multiplier, flatBonus, scalingType = 'hp' }) {
  if (scalingType == 'attack') {
    return stats.flatAtk * multiplier + flatBonus;
  } else if (scalingType == 'defense') {
    return stats.flatDef * multiplier + flatBonus;
  } else if (scalingType == 'hp') {
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
  scalingType = 'hp',
  modifier,
}) {
  let dmgAbsorption = calculateHp({
    stats,
    multiplier,
    flatBonus,
    scalingType,
  });

  // Geo Shields
  if (element === 'geo') dmgAbsorption *= 1.5;

  // Shield bonus from external sources
  if (stats.shieldStrength !== undefined)
    dmgAbsorption *= 1 + stats.shieldStrength;

  // Character-specific bonuses

  // Diona Hold Skill
  if (modifier.dionaHoldSkill) dmgAbsorption *= 1.75;

  return dmgAbsorption;
}

// Used for all default normal attacks
function normalAttackDefault({ hits, element, params, stats, modifier }) {
  let talentValues = [];
  for (let i = 0; i < hits; i++) {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: 'normal',
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
function normalAttackMulti({ hits = [], element, params, stats, modifier }) {
  let talentValues = hits.map((hitCount, i) => {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: 'normal',
      modifier,
    });

    let damages = [];
    for (let hit = 0; hit < hitCount; hit++) {
      damages.push(damage);
    }

    return {
      description: `${i + 1}HitDmg`,
      damage: damages,
    };
  });

  return talentValues;
}

// Used for all 1-hit charged attacks
function chargedAttackDefault({ element, params, stats, modifier }) {
  let damage = calculateTotalDamage({
    stats,
    multiplier: params[0],
    element,
    attackType: 'charged',
    modifier,
  });

  return [
    {
      description: 'chargedDmg',
      damage: [damage],
    },
  ];
}

// Used for multi-hit charged attacks
function chargedAttackMulti({ hits, element, params, stats, modifier }) {
  let damages = [];
  for (let i = 0; i < hits; i++) {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: 'charged',
      modifier,
    });
    damages.push(damage);
  }

  return [
    {
      description: `chargedDmg`,
      damage: damages,
    },
  ];
}

// Used for all default claymore charged attacks
function chargedAttackHeavy({ element = 'physical', params, stats, modifier }) {
  let descriptions = ['chargedSpinDmg', 'chargedFinalDmg'];
  return descriptions.map((description, i) => {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: 'charged',
      modifier,
    });

    return {
      description: description,
      damage: [damage],
    };
  });
}

// Used for all default plunge attacks
function plungeAttackDefault({ element, params, stats, modifier }) {
  let descriptions = ['plungeDmg', 'lowPlungeDmg', 'highPlungeDmg'];
  return descriptions.map((description, i) => {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element,
      attackType: 'plunge',
      modifier,
    });

    return {
      description: description,
      damage: [damage],
    };
  });
}

// Used for all default sword/polearm/catalyst attacks
function attackLightDefault({
  normalHits,
  element = 'physical',
  params,
  stats,
  modifier,
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
function attackLightMulti({
  normalHits = [],
  chargedHits = 1,
  element = 'physical',
  params,
  stats,
  modifier,
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
function attackHeavyDefault({
  normalHits,
  element = 'physical',
  params,
  stats,
  modifier,
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
function attackHeavyMulti({
  normalHits = [],
  element = 'physical',
  params,
  stats,
  modifier,
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
function aimShotDefault({ chargedElement, params, stats, modifier }) {
  let talentValues = [];

  let damage = calculateTotalDamage({
    stats,
    multiplier: params[0],
    element: 'physical',
    attackType: 'normal',
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
    attackType: 'charged',
    modifier,
  });
  talentValues.push({
    description: 'chargedAimShotDmg',
    damage: [damage],
  });

  return talentValues;
}

// Used for all default bow attacks
function attackBowDefault({
  normalHits,
  chargedElement,
  params,
  stats,
  modifier,
}) {
  let talentValues = [];

  talentValues.push(
    ...normalAttackDefault({
      hits: normalHits,
      element: 'physical',
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
      element: 'physical',
      params: params.slice(normalHits + 2),
      stats,
      modifier,
    })
  );

  return talentValues;
}

// Base function for all damage skills. Returns an object representing a single line to be displayed.
// The returned object should always be added into an array to construct the list of talent damage.
function skillBase({ description, element, multiplier, stats, modifier }) {
  let damage = calculateTotalDamage({
    element,
    multiplier,
    attackType: 'skill',
    stats,
    modifier,
  });

  return {
    description,
    damage: [damage],
  };
}

// Used for all default skill that only does 1-hit elemental dmg
function skillDefault({ element, params, stats, modifier }) {
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
function skillMultiBase({
  description,
  hits,
  element,
  params,
  stats,
  modifier,
}) {
  let damages = [];

  for (let i = 0; i < hits; i++) {
    damages.push(
      calculateTotalDamage({
        element,
        multiplier: params[i],
        attackType: 'skill',
        stats,
        modifier,
      })
    );
  }

  return {
    description,
    damage: damages,
  };
}

// Base function for all damage bursts. Returns an object representing a single line to be displayed.
// The returned object should always be added into an array to construct the list of talent damage.
function burstBase({ description, element, multiplier, stats, modifier }) {
  let damage = calculateTotalDamage({
    element,
    multiplier,
    attackType: 'burst',
    stats,
    modifier,
  });

  return {
    description,
    damage: [damage],
  };
}

// Used for all default burst that only does 1-hit elemental dmg
function burstDefault({ element, params, stats, modifier }) {
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
function burstMultiBase({
  description,
  hits,
  element,
  params,
  stats,
  modifier,
}) {
  let damages = [];

  for (let i = 0; i < hits; i++) {
    damages.push(
      calculateTotalDamage({
        element,
        multiplier: params[i],
        attackType: 'burst',
        stats,
        modifier,
      })
    );
  }

  return {
    description,
    damage: damages,
  };
}

// Base function for all healing skills. Returns an object representing a single line to be displayed.
// The returned object should always be added into an array to construct the list of talent damage.
function healingSkillBase({
  description,
  scalingType = 'hp',
  params,
  stats,
  modifier,
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
  };
}

// Base function for all shields/summon HP
function hpBase({
  description,
  multiplier,
  flatBonus,
  scalingType = 'hp',
  stats,
  modifier,
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
  };
}

function shieldBase({
  description,
  multiplier,
  flatBonus,
  element,
  scalingType = 'hp',
  stats,
  modifier,
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
  };
}

// Public functions
// Access using talent[characterId + type]

// Lisa
export function lisaAttack({ params, stats, modifier }) {
  return attackLightDefault({
    normalHits: 4,
    element: 'electro',
    params,
    stats,
    modifier,
  });
}

export function lisaSkill({ params, stats, modifier }) {
  let talentDmg = [];

  talentDmg.push(
    skillBase({
      description: 'pressDmg',
      element: 'electro',
      multiplier: params[5],
      stats,
      modifier,
    })
  );

  for (let i = 0; i <= 3; i++) {
    talentDmg.push(
      skillBase({
        description: `holdDmgStack${i}`,
        element: 'electro',
        multiplier: params[i],
        stats,
        modifier,
      })
    );
  }

  return talentDmg;
}

export function lisaBurst({ params, stats, modifier }) {
  return burstDefault({
    element: 'electro',
    params,
    stats,
    modifier,
  });
}

// Barbara
export function barbaraAttack({ params, stats, modifier }) {
  return attackLightDefault({
    normalHits: 4,
    element: 'hydro',
    params,
    stats,
    modifier,
  });
}

export function barbaraSkill({ params, stats, modifier }) {
  let talentDmg = [
    healingSkillBase({
      description: 'hpRegenContinuous',
      params: params.slice(0, 2),
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenOnHit',
      params: params.slice(2, 4),
      stats,
      modifier,
    }),

    skillBase({
      description: 'dropletDmg',
      element: 'hydro',
      multiplier: params[4],
      stats,
      modifier,
    }),
  ];

  return talentDmg;
}

export function barbaraBurst({ params, stats, modifier }) {
  return [
    healingSkillBase({
      description: 'hpRegen',
      params,
      stats,
      modifier,
    }),
  ];
}

// Kaeya
export function kaeyaAttack({ params, stats, modifier }) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 1, 1],
    chargedHits: 2,
    params,
    stats,
    modifier,
  });
}

export function kaeyaSkill({ params, stats, modifier }) {
  return skillDefault({
    element: 'cryo',
    params,
    stats,
    modifier,
  });
}

export function kaeyaBurst({ params, stats, modifier }) {
  return burstDefault({
    element: 'cryo',
    params,
    stats,
    modifier,
  });
}

// Diluc
export function dilucAttack({ params, stats, modifier }) {
  let element = modifier.infusion ? 'pyro' : 'physical';
  return attackHeavyDefault({
    normalHits: 4,
    element,
    params,
    stats,
    modifier,
  });
}

export function dilucSkill({ params, stats, modifier }) {
  let talentDamage = [];
  for (let i = 0; i < 3; i++) {
    talentDamage.push(
      skillBase({
        description: `${i + 1}HitDmg`,
        element: 'pyro',
        multiplier: params[i],
        stats,
        modifier,
      })
    );
  }

  return talentDamage;
}

export function dilucBurst({ params, stats, modifier }) {
  let descriptions = ['slashingDmg', 'dot', 'explosionDmg'];
  let talentDamage = descriptions.map((description, i) => {
    return burstBase({
      description,
      element: 'pyro',
      multiplier: params[i],
      stats,
      modifier,
    });
  });

  return talentDamage;
}

// Razor
export function razorAttack({ params, stats, modifier }) {
  return attackHeavyDefault({
    normalHits: 4,
    params,
    stats,
    modifier,
  });
}

export function razorSkill({ params, stats, modifier }) {
  let descriptions = ['pressDmg', 'holdDmg'];
  return descriptions.map((description, i) => {
    return skillBase({
      description,
      element: 'electro',
      multiplier: params[i],
      stats,
      modifier,
    });
  });
}

export function razorBurst({ params, stats, modifier }) {
  let talentDamage = burstDefault({
    element: 'electro',
    params,
    stats,
    modifier,
  });

  let attackParams = getTalentStatsAt(
    'attack',
    modifier.talentAttackLevel,
    getTalentData('razor')
  );

  for (let i = 0; i < 4; i++) {
    talentDamage.push(
      burstBase({
        description: `${i + 1}HitDmgSoulCompanion`,
        element: 'electro',
        multiplier: params[1] * attackParams[i],
        stats,
        modifier,
      })
    );
  }

  return talentDamage;
}

// Amber
export function amberAttack({ params, stats, modifier }) {
  return attackBowDefault({
    normalHits: 5,
    chargedElement: 'pyro',
    params,
    stats,
    modifier,
  });
}

export function amberSkill({ params, stats, modifier }) {
  let talentDamage = [];

  talentDamage.push(
    skillBase({
      description: 'explosionDmg',
      element: 'electro',
      multiplier: params[1],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    hpBase({
      description: 'baronBunnyHp',
      multiplier: params[0],
      flatBonus: 0,
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function amberBurst({ params, stats, modifier }) {
  let talentDamage = [];

  talentDamage.push(
    burstBase({
      description: 'dmgPerWave',
      element: 'pyro',
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  talentDamage.push({
    description: 'totalDmg',
    damage: [talentDamage[0].damage[0] * 18],
  });

  return talentDamage;
}

// Venti
export function ventiAttack({ params, stats, modifier }) {
  return attackBowDefault({
    normalHits: 6,
    chargedElement: 'anemo',
    params,
    stats,
    modifier,
  });
}

export function ventiSkill({ params, stats, modifier }) {
  return [
    skillBase({
      description: 'pressDmg',
      element: 'anemo',
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillBase({
      description: 'holdDmg',
      element: 'anemo',
      multiplier: params[2],
      stats,
      modifier,
    }),
  ];
}

export function ventiBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'dot',
      element: 'anemo',
      multiplier: params[0],
      stats,
      modifier,
    }),

    // Not sure how the elemental absorption dmg is calculated
    burstBase({
      description: 'dotElementalAbsorption',
      element: 'none',
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

// Xiangling
export function xianglingAttack({ params, stats, modifier }) {
  return attackLightMulti({
    normalHits: [1, 1, 2, 4, 1],
    params,
    stats,
    modifier,
  });
}

export function xianglingSkill({ params, stats, modifier }) {
  return [
    skillBase({
      description: 'guobaDmg',
      element: 'pyro',
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}

export function xianglingBurst({ params, stats, modifier }) {
  let talentDamage = [];

  for (let i = 0; i < 3; i++) {
    talentDamage.push(
      burstBase({
        description: `swing${i + 1}HitDmg`,
        element: 'pyro',
        multiplier: params[i],
        stats,
        modifier,
      })
    );
  }

  talentDamage.push(
    burstBase({
      description: 'pyronadoDmg',
      element: 'pyro',
      multiplier: params[3],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

// Beidou
export function beidouAttack({ params, stats, modifier }) {
  return attackHeavyDefault({
    normalHits: 5,
    params,
    stats,
    modifier,
  });
}

export function beidouSkill({ params, stats, modifier }) {
  let talentDamage = [];

  talentDamage.push(
    shieldBase({
      description: 'shieldHp',
      multiplier: params[0],
      flatBonus: params[1],
      element: 'electro',
      stats,
      modifier,
    })
  );

  talentDamage.push(
    skillBase({
      description: 'baseDmg',
      element: 'electro',
      multiplier: params[2],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    skillBase({
      description: 'dmgBonusOnHitTaken',
      element: 'electro',
      multiplier: params[3],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function beidouBurst({ params, stats, modifier }) {
  let talentDamage = [];

  talentDamage.push(
    burstBase({
      description: 'skillDmg',
      element: 'electro',
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    burstBase({
      description: 'lightningDmg',
      element: 'electro',
      multiplier: params[1],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

// Xingqiu
export function xingqiuAttack({ params, stats, modifier }) {
  return attackLightMulti({
    normalHits: [1, 1, 2, 1, 2],
    chargedHits: 2,
    params: params
      .slice(0, 3)
      .concat(params.slice(4, 6))
      .concat(params.slice(7)),
    stats,
    modifier,
  });
}

export function xingqiuSkill({ params, stats, modifier }) {
  return [
    skillMultiBase({
      description: 'skillDmg',
      hits: 2,
      element: 'hydro',
      params,
      stats,
      modifier,
    }),
  ];
}

export function xingqiuBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'swordRainDmg',
      element: 'hydro',
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}

// Xiao
export function xiaoAttack({ params, stats, modifier }) {
  if (modifier.infusion) {
    let burstParams = getTalentStatsAt(
      'burst',
      modifier.talentBurstLevel,
      getTalentData('xiao')
    );
    let modifiedStats = { ...stats };

    if (modifiedStats.normalDmgBonus === undefined) {
      modifiedStats.normalDmgBonus = burstParams[0];
    } else {
      modifiedStats.normalDmgBonus += burstParams[0];
    }

    if (modifiedStats.chargedDmgBonus === undefined) {
      modifiedStats.chargedDmgBonus = burstParams[0];
    } else {
      modifiedStats.chargedDmgBonus += burstParams[0];
    }

    if (modifiedStats.plungeDmgBonus === undefined) {
      modifiedStats.plungeDmgBonus = burstParams[0];
    } else {
      modifiedStats.plungeDmgBonus += burstParams[0];
    }

    return attackLightMulti({
      normalHits: [2, 1, 1, 2, 1, 1],
      element: 'anemo',
      params: params.slice(1, 5).concat(params.slice(6)),
      stats: modifiedStats,
      modifier,
    });
  } else {
    return attackLightMulti({
      normalHits: [2, 1, 1, 2, 1, 1],
      params: params.slice(1, 5).concat(params.slice(6)),
      stats,
      modifier,
    });
  }
}

export function xiaoSkill({ params, stats, modifier }) {
  return skillDefault({
    element: 'anemo',
    params,
    stats,
    modifier,
  });
}

export function xiaoBurst({ params, stats, modifier }) {
  return defaultTalent();
}

// Ningguang
export function ningguangAttack({ params, stats, modifier }) {
  let talentDmg = [];

  // Ningguang's normal attack has no combo
  let normalAtkDmg = calculateTotalDamage({
    stats,
    multiplier: params[0],
    element: 'geo',
    attackType: 'normal',
    modifier,
  });
  talentDmg.push({
    description: 'normalAtkDmg',
    damage: [normalAtkDmg],
  });

  talentDmg.push(
    ...chargedAttackDefault({
      element: 'geo',
      params: params.slice(1, 2),
      stats,
      modifier,
    })
  );

  // Ningguang's charged attack dmg per star jade
  let starJadeDmg = calculateTotalDamage({
    stats,
    multiplier: params[2],
    element: 'geo',
    attackType: 'charged',
    modifier,
  });
  talentDmg.push({
    description: 'starJadeDmg',
    damage: [starJadeDmg],
  });

  talentDmg.push(
    ...plungeAttackDefault({
      element: 'geo',
      params: params.slice(4),
      stats,
      modifier,
    })
  );

  return talentDmg;
}

export function ningguangSkill({ params, stats, modifier }) {
  let talentDamage = [];

  talentDamage.push(
    skillBase({
      description: 'skillDmg',
      element: 'geo',
      multiplier: params[1],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    hpBase({
      description: 'jadeScreenHp',
      multiplier: params[2],
      flatBonus: 0,
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function ningguangBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'dmgPerGem',
      element: 'geo',
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}

// Klee
export function kleeAttack({ params, stats, modifier }) {
  return attackLightDefault({
    normalHits: 3,
    element: 'pyro',
    params,
    stats,
    modifier,
  });
}

export function kleeSkill({ params, stats, modifier }) {
  return [
    skillBase({
      description: 'jumpyDumptyDmg',
      element: 'pyro',
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillBase({
      description: 'mineDmg',
      element: 'pyro',
      multiplier: params[3],
      stats,
      modifier,
    }),
  ];
}

export function kleeBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'sparksNSplashDmg',
      element: 'pyro',
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}

// Zhongli
export function zhongliAttack({ params, stats, modifier }) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 1, 4, 1],
    params,
    stats,
    modifier,
  });
}

export function zhongliSkill({ params, stats, modifier }) {
  let descriptions = ['stoneSteeleDmg', 'resonanceDmg'];

  let talentDamage = descriptions.map((description, i) => {
    return skillBase({
      description,
      element: 'geo',
      multiplier: params[i],
      stats,
      modifier,
    });
  });

  talentDamage.push(
    skillBase({
      description: 'holdDmg',
      element: 'geo',
      multiplier: params[3],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    shieldBase({
      description: 'shieldHp',
      multiplier: params[5],
      flatBonus: params[4],
      element: 'geo',
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function zhongliBurst({ params, stats, modifier }) {
  return burstDefault({
    element: 'geo',
    params,
    stats,
    modifier,
  });
}

// Fischl
export function fischlAttack({ params, stats, modifier }) {
  return attackBowDefault({
    normalHits: 5,
    chargedElement: 'electro',
    params,
    stats,
    modifier,
  });
}

export function fischlSkill({ params, stats, modifier }) {
  let descriptions = ['ozDmg', 'summoningDmg'];
  return descriptions.map((description, i) =>
    skillBase({
      description,
      element: 'electro',
      multiplier: params[i],
      stats,
      modifier,
    })
  );
}

export function fischlBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'fallingThunderDmg',
      element: 'electro',
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}

// Bennett
export function bennettAttack({ params, stats, modifier }) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 1, 1],
    chargedHits: 2,
    params,
    stats,
    modifier,
  });
}

export function bennettSkill({ params, stats, modifier }) {
  return [
    skillBase({
      description: 'pressDmg',
      element: 'pyro',
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillMultiBase({
      description: 'chargeLevel1Dmg',
      hits: 2,
      element: 'pyro',
      params: params.slice(1, 3),
      stats,
      modifier,
    }),

    skillMultiBase({
      description: 'chargeLevel2Dmg',
      hits: 2,
      element: 'pyro',
      params: params.slice(3, 5),
      stats,
      modifier,
    }),

    skillBase({
      description: 'explosionDmg',
      element: 'pyro',
      multiplier: params[5],
      stats,
      modifier,
    }),
  ];
}

export function bennettBurst({ params, stats, modifier }) {
  let talentDamage = [
    burstBase({
      description: 'burstDmg',
      element: 'pyro',
      multiplier: params[0],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenContinuousPerSecond',
      params: params.slice(1, 3),
      stats,
      modifier,
    }),
  ];

  // ATK Bonus
  let atkBonus = stats.baseAtk * params[3];
  talentDamage.push({
    description: 'atkBonus',
    damage: [atkBonus],
  });

  return talentDamage;
}

// Tartaglia
export function tartagliaAttack({ params, stats, modifier }) {
  let talentDamage = attackBowDefault({
    normalHits: 6,
    chargedElement: 'hydro',
    params: params.slice(0, 8).concat(params.slice(10)),
    stats,
    modifier,
  });

  let riptideFlashDmg = calculateTotalDamage({
    stats,
    multiplier: params[8],
    element: 'hydro',
    attackType: 'normal',
    modifier,
  });
  talentDamage.push({
    description: 'riptideFlashDmg',
    damage: [riptideFlashDmg],
  });

  let riptideBurstDmg = calculateTotalDamage({
    stats,
    multiplier: params[9],
    element: 'hydro',
    attackType: 'normal',
    modifier,
  });
  talentDamage.push({
    description: 'riptideBurstDmg',
    damage: [riptideBurstDmg],
  });

  return talentDamage;
}

export function tartagliaSkill({ params, stats, modifier }) {
  let talentDamage = [];

  talentDamage.push(
    skillBase({
      description: 'stanceChangeDmg',
      element: 'hydro',
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    ...normalAttackMulti({
      hits: [1, 1, 1, 1, 1, 2],
      element: 'hydro',
      params: params.slice(1, 8),
      stats,
      modifier,
    })
  );

  talentDamage.push(
    ...chargedAttackMulti({
      hits: 2,
      element: 'hydro',
      params: params.slice(8, 10),
      stats,
      modifier,
    })
  );

  talentDamage.push(
    skillBase({
      description: 'riptideSlashDmg',
      element: 'hydro',
      multiplier: params[10],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function tartagliaBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'burstDmgMelee',
      element: 'hydro',
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'burstDmgRanged',
      element: 'hydro',
      multiplier: params[2],
      stats,
      modifier,
    }),

    burstBase({
      description: 'riptideBlastDmg',
      element: 'hydro',
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

// Noelle
export function noelleAttack({ params, stats, modifier }) {
  if (modifier.infusion) {
    let burstParams = getTalentStatsAt(
      'burst',
      modifier.talentBurstLevel,
      getTalentData('noelle')
    );
    let modifiedStats = {
      ...stats,
      flatAtk: stats.flatAtk + stats.flatDef * burstParams[2],
    };

    return attackHeavyDefault({
      normalHits: 4,
      element: 'geo',
      params,
      stats: modifiedStats,
      modifier,
    });
  } else {
    return attackHeavyDefault({
      normalHits: 4,
      params,
      stats,
      modifier,
    });
  }
}

export function noelleSkill({ params, stats, modifier }) {
  let talentDamage = [];

  let skillDamage = calculateTotalDamage({
    stats,
    multiplier: params[5],
    element: 'geo',
    scalingType: 'defense',
    attackType: 'skill',
    modifier,
  });
  talentDamage.push({
    description: 'skillDmg',
    damage: [skillDamage],
  });

  talentDamage.push(
    shieldBase({
      description: 'shieldHp',
      multiplier: params[0],
      flatBonus: params[6],
      element: 'geo',
      scalingType: 'defense',
      stats,
      modifier,
    })
  );

  talentDamage.push(
    healingSkillBase({
      description: 'healing',
      params: [params[1], params[7]],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function noelleBurst({ params, stats, modifier }) {
  let modifiedStats = {
    ...stats,
    flatAtk: stats.flatAtk + stats.flatDef * params[2],
  };

  return [
    burstBase({
      description: 'burstInitDmg',
      element: 'geo',
      multiplier: params[0],
      stats: modifiedStats,
      modifier,
    }),

    burstBase({
      description: 'firstSwingDmg',
      element: 'geo',
      multiplier: params[1],
      stats: modifiedStats,
      modifier,
    }),
  ];
}

// Qiqi
export function qiqiAttack({ params, stats, modifier }) {
  return attackLightMulti({
    normalHits: [1, 1, 2, 2, 1],
    chargedHits: 2,
    params: params.slice(0, 6).concat(params[5]).concat(params.slice(6)),
    stats,
    modifier,
  });
}

export function qiqiSkill({ params, stats, modifier }) {
  return [
    skillBase({
      description: 'skillDmg',
      element: 'cryo',
      multiplier: params[7],
      stats,
      modifier,
    }),

    skillBase({
      description: 'heraldOfFrostDmg',
      element: 'cryo',
      multiplier: params[4],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenOnHit',
      scalingType: 'attack',
      params: params.slice(0, 2),
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenContinuous',
      scalingType: 'attack',
      params: params.slice(2, 4),
      stats,
      modifier,
    }),
  ];
}

export function qiqiBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'burstDmg',
      element: 'cryo',
      multiplier: params[2],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'healing',
      scalingType: 'attack',
      params,
      stats,
      modifier,
    }),
  ];
}

// Chongyun
export function chongyunAttack({ params, stats, modifier }) {
  if (modifier.infusion) {
    return attackHeavyDefault({
      normalHits: 4,
      element: 'cryo',
      params,
      stats,
      modifier,
    });
  } else {
    return attackHeavyDefault({
      normalHits: 4,
      params,
      stats,
      modifier,
    });
  }
}

export function chongyunSkill({ params, stats, modifier }) {
  return skillDefault({
    element: 'cryo',
    params: params,
    stats,
    modifier,
  });
}

export function chongyunBurst({ params, stats, modifier }) {
  return burstDefault({
    element: 'cryo',
    params: params,
    stats,
    modifier,
  });
}

// Ganyu
export function ganyuAttack({ params, stats, modifier }) {
  let talentDamage = [];

  // Normal attack
  talentDamage.push(
    ...normalAttackDefault({
      hits: 6,
      element: 'physical',
      params,
      stats,
      modifier,
    })
  );

  // Charged attack
  let aimedShotDmg = calculateTotalDamage({
    stats,
    multiplier: params[6],
    element: 'physical',
    attackType: 'normal',
    modifier,
  });
  talentDamage.push({
    description: 'aimShotDmg',
    damage: [aimedShotDmg],
  });

  let chargedDescriptions = [
    'aimShotChargeLevel1',
    'frostflakeArrowDmg',
    'frostflakeArrowBloomDmg',
  ];
  let chargedDmg = chargedDescriptions.map((description, i) => {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i + 7],
      element: 'cryo',
      attackType: 'charged',
      modifier,
    });

    return {
      description,
      damage: [damage],
    };
  });
  talentDamage.push(...chargedDmg);

  talentDamage.push(
    ...plungeAttackDefault({
      element: 'physical',
      params: params.slice(10),
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function ganyuSkill({ params, stats, modifier }) {
  return [
    skillBase({
      description: 'skillDmg',
      element: 'cryo',
      multiplier: params[1],
      stats,
      modifier,
    }),

    hpBase({
      description: 'iceLotusHp',
      multiplier: params[0],
      flatBonus: 0,
      stats,
      modifier,
    }),
  ];
}

export function ganyuBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'iceShardDmg',
      element: 'cryo',
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}

// Albedo
export function albedoAttack({ params, stats, modifier }) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 1, 1],
    chargedHits: 2,
    params,
    stats,
    modifier,
  });
}

export function albedoSkill({ params, stats, modifier }) {
  let talentDmg = [];

  talentDmg.push(
    skillBase({
      description: 'skillDmg',
      element: 'geo',
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  let transientBlossomDmg = calculateTotalDamage({
    stats,
    multiplier: params[1],
    element: 'geo',
    scalingType: 'defense',
    attackType: 'skill',
    modifier,
  });
  talentDmg.push({
    description: 'transientBlossomDmg',
    damage: [transientBlossomDmg],
  });

  return talentDmg;
}

export function albedoBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'burstDmg',
      element: 'geo',
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'fatalBlossomDmg',
      element: 'geo',
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

// Diona
export function dionaAttack({ params, stats, modifier }) {
  return attackBowDefault({
    normalHits: 5,
    chargedElement: 'cryo',
    params: params.slice(0, 5).concat(params.slice(6)),
    stats,
    modifier,
  });
}

export function dionaSkill({ params, stats, modifier }) {
  let holdModifier = {
    ...modifier,
    dionaHoldSkill: true,
  };

  return [
    skillBase({
      description: 'icyPawDmgPerPaw',
      element: 'cryo',
      multiplier: params[0],
      stats,
      modifier,
    }),

    shieldBase({
      description: 'shieldHpPress',
      multiplier: params[1],
      flatBonus: params[2],
      element: 'cryo',
      stats,
      modifier,
    }),

    shieldBase({
      description: 'shieldHpHold',
      multiplier: params[1],
      flatBonus: params[2],
      element: 'cryo',
      stats,
      modifier: holdModifier,
    }),
  ];
}

export function dionaBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'burstDmg',
      element: 'cryo',
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'continuousFieldDmg',
      element: 'cryo',
      multiplier: params[1],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'hpRegenContinuousTime',
      params: params.slice(2),
      stats,
      modifier,
    }),
  ];
}

// Mona
export function monaAttack({ params, stats, modifier }) {
  return attackLightDefault({
    normalHits: 4,
    element: 'hyrdo',
    params,
    stats,
    modifier,
  });
}

export function monaSkill({ params, stats, modifier }) {
  return [
    skillBase({
      description: 'dot',
      element: 'hydro',
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillBase({
      description: 'explosionDmg',
      element: 'hydro',
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

export function monaBurst({ params, stats, modifier }) {
  let modifiedStats = { ...stats };
  if (modifiedStats.dmgBonus !== undefined) {
    modifiedStats.dmgBonus += params[9];
  } else {
    modifiedStats.dmgBonus = params[9];
  }

  return [
    burstBase({
      description: 'explosionDmg',
      element: 'hydro',
      multiplier: params[1],
      stats: modifiedStats,
      modifier,
    }),
  ];
}

// Keqing
export function keqingAttack({ params, stats, modifier }) {
  let talentDamage = [];

  // Normal attack
  for (let i = 0; i < 3; i++) {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element: 'physical',
      attackType: 'normal',
      modifier,
    });
    talentDamage.push({
      description: `${i + 1}HitDmg`,
      damage: [damage],
    });
  }

  let hit4Dmg = [];
  for (let i = 3; i < 5; i++) {
    hit4Dmg.push(
      calculateTotalDamage({
        stats,
        multiplier: params[i],
        element: 'physical',
        attackType: 'normal',
        modifier,
      })
    );
  }
  talentDamage.push({
    description: '4HitDmg',
    damage: hit4Dmg,
  });

  let hit5Dmg = [
    calculateTotalDamage({
      stats,
      multiplier: params[5],
      element: 'physical',
      attackType: 'normal',
      modifier,
    }),
  ];
  talentDamage.push({
    description: `5HitDmg`,
    damage: hit5Dmg,
  });

  // Charged attack
  talentDamage.push(
    ...chargedAttackMulti({
      hits: 2,
      element: 'physical',
      params: params.slice(6, 8),
      stats,
      modifier,
    })
  );

  // Plunge attack
  talentDamage.push(
    ...plungeAttackDefault({
      element: 'physical',
      params: params.slice(9, 12),
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function keqingSkill({ params, stats, modifier }) {
  let descriptions = ['lightningStilettoDmg', 'slashingDmg'];
  let talentDamage = descriptions.map((description, i) => {
    return skillBase({
      description,
      element: 'electro',
      multiplier: params[i],
      stats,
      modifier,
    });
  });

  talentDamage.push(
    skillMultiBase({
      description: 'thunderclapSlashDmg',
      hits: 2,
      element: 'electro',
      params: [params[2], params[2]],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function keqingBurst({ params, stats, modifier }) {
  let talentDamage = [];

  talentDamage.push(
    burstBase({
      description: 'burstInitDmg',
      element: 'electro',
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  let consecutiveSlashDmg = calculateTotalDamage({
    stats,
    multiplier: params[1],
    element: 'electro',
    attackType: 'burst',
    modifier,
  });
  talentDamage.push({
    description: 'consecutiveSlashDmg',
    damage: Array(8).fill(consecutiveSlashDmg),
  });

  talentDamage.push(
    burstBase({
      description: 'lastAttackDmg',
      element: 'electro',
      multiplier: params[2],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

// Sucrose
export function sucroseAttack({ params, stats, modifier }) {
  return attackLightDefault({
    normalHits: 4,
    element: 'anemo',
    params,
    stats,
    modifier,
  });
}

export function sucroseSkill({ params, stats, modifier }) {
  return skillDefault({
    element: 'anemo',
    params,
    stats,
    modifier,
  });
}

export function sucroseBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'dot',
      element: 'anemo',
      multiplier: params[0],
      stats,
      modifier,
    }),

    // Not sure how the elemental absorption dmg is calculated
    burstBase({
      description: 'dotElementalAbsorption',
      element: 'none',
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

// Xinyan
export function xinyanAttack({ params, stats, modifier }) {
  return attackHeavyDefault({
    normalHits: 4,
    params,
    stats,
    modifier,
  });
}

export function xinyanSkill({ params, stats, modifier }) {
  let talentDamage = [];

  talentDamage.push(
    skillBase({
      description: 'swingDmg',
      element: 'pyro',
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  // Shields
  for (let i = 0; i < 3; i++) {
    talentDamage.push(
      shieldBase({
        description: `shieldHpLevel${i + 1}`,
        multiplier: params[2 * i + 1],
        flatBonus: params[2 * i + 2],
        element: 'pyro',
        scalingType: 'defense',
        stats,
        modifier,
      })
    );
  }

  talentDamage.push(
    skillBase({
      description: 'dot',
      element: 'pyro',
      multiplier: params[7],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function xinyanBurst({ params, stats, modifier }) {
  return [
    burstBase({
      description: 'burstDmg',
      element: 'physical',
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'pyroDot',
      element: 'pyro',
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

// Rosaria
export function rosariaAttack({ params, stats, modifier }) {
  let talentDamage = [];

  // Normal attack
  talentDamage.push(
    ...normalAttackMulti({
      hits: [1, 1, 2, 1],
      element: 'physical',
      params,
      stats,
      modifier,
    })
  );

  let hit5Dmg = [];
  for (let i = 4; i < 6; i++) {
    hit5Dmg.push(
      calculateTotalDamage({
        stats,
        multiplier: params[i],
        element: 'physical',
        attackType: 'normal',
        modifier,
      })
    );
  }
  talentDamage.push({
    description: '5HitDmg',
    damage: hit5Dmg,
  });

  // Charged attack
  talentDamage.push(
    ...chargedAttackDefault({
      element: 'physical',
      params: params.slice(6, 7),
      stats,
      modifier,
    })
  );

  // Plunge attack
  talentDamage.push(
    ...plungeAttackDefault({
      element: 'physical',
      params: params.slice(8, 11),
      stats,
      modifier,
    })
  );

  return talentDamage;
}

export function rosariaSkill({ params, stats, modifier }) {
  return [
    skillMultiBase({
      description: 'skillDmg',
      hits: 2,
      element: 'cryo',
      params,
      stats,
      modifier,
    }),
  ];
}

export function rosariaBurst({ params, stats, modifier }) {
  return [
    burstMultiBase({
      description: 'burstDmg',
      hits: 2,
      element: 'cryo',
      params,
      stats,
      modifier,
    }),

    burstBase({
      description: 'iceLanceDot',
      element: 'cyro',
      multiplier: params[2],
      stats,
      modifier,
    }),
  ];
}

// Hu Tao
export function hutaoAttack({ params, stats, modifier }) {
  let element = 'physical';
  let modifiedStats = { ...stats };

  if (modifier.infusion) {
    element = 'pyro';

    let skillParams = getTalentStatsAt(
      'skill',
      modifier.talentSkillLevel,
      getTalentData('hutao')
    );
    modifiedStats.flatAtk += skillParams[1] * stats.flatHp;
  }

  let talentDamage = [];

  // Normal attack
  talentDamage.push(
    ...normalAttackDefault({
      hits: 4,
      element,
      params,
      stats: modifiedStats,
      modifier,
    })
  );

  let hit5Dmg = [];
  for (let i = 4; i < 6; i++) {
    hit5Dmg.push(
      calculateTotalDamage({
        stats: modifiedStats,
        multiplier: params[i],
        element,
        attackType: 'normal',
        modifier,
      })
    );
  }
  talentDamage.push({
    description: '5HitDmg',
    damage: hit5Dmg,
  });

  let hit6Dmg = [
    calculateTotalDamage({
      stats: modifiedStats,
      multiplier: params[6],
      element,
      attackType: 'normal',
      modifier,
    }),
  ];
  talentDamage.push({
    description: '6HitDmg',
    damage: hit6Dmg,
  });

  // Charged attack
  talentDamage.push(
    ...chargedAttackDefault({
      element,
      params: params.slice(7, 8),
      stats: modifiedStats,
      modifier,
    })
  );

  // Plunge attack
  talentDamage.push(
    ...plungeAttackDefault({
      element,
      params: params.slice(9, 12),
      stats: modifiedStats,
      modifier,
    })
  );

  return talentDamage;
}

export function hutaoSkill({ params, stats, modifier }) {
  let modifiedStats = { ...stats };
  if (modifier.infusion) {
    modifiedStats.flatAtk += params[1] * stats.flatHp;
  }

  return [
    skillBase({
      description: 'bloodBlossomDmg',
      element: 'pyro',
      multiplier: params[2],
      stats: modifiedStats,
      modifier,
    }),
  ];
}

export function hutaoBurst({ params, stats, modifier }) {
  let modifiedStats = { ...stats };
  if (modifier.infusion) {
    let skillParams = getTalentStatsAt(
      'skill',
      modifier.talentSkillLevel,
      getTalentData('hutao')
    );
    modifiedStats.flatAtk += skillParams[1] * stats.flatHp;
  }

  let talentDamage = [];

  let dmgDescriptions = ['burstDmg', 'burstDmgLowHp'];
  dmgDescriptions.forEach((description, i) => {
    talentDamage.push(
      burstBase({
        description,
        element: 'pyro',
        multiplier: params[i],
        stats: modifiedStats,
        modifier,
      })
    );
  });

  let regenDescriptions = ['hpRegen', 'hpRegenLowHp'];
  regenDescriptions.forEach((description, i) => {
    talentDamage.push(
      healingSkillBase({
        description,
        params: [params[i + 2], 0],
        stats: modifiedStats,
        modifier,
      })
    );
  });

  return talentDamage;
}

// Yanfei
export function yanfeiAttack({ params, stats, modifier }) {
  let modifiedStats = { ...stats };
  if (modifier.brilliance) {
    let burstParams = getTalentStatsAt(
      'burst',
      modifier.talentBurstLevel,
      getTalentData('yanfei')
    );

    if (modifiedStats.chargedDmgBonus === undefined) {
      modifiedStats.chargedDmgBonus = burstParams[1];
    } else {
      modifiedStats.chargedDmgBonus += burstParams[1];
    }
  }

  let talentDamage = [];

  // Normal attack
  talentDamage.push(
    ...normalAttackDefault({
      hits: 3,
      element: 'pyro',
      params,
      stats: modifiedStats,
      modifier,
    })
  );

  // Charged attack
  for (let i = 0; i < 5; i++) {
    let damage = calculateTotalDamage({
      stats: modifiedStats,
      multiplier: params[i + 3],
      element: 'pyro',
      attackType: 'charged',
      modifier,
    });
    talentDamage.push({
      description: `chargedDmgSeal${i}`,
      damage: [damage],
    });
  }

  // Plunge attack
  talentDamage.push(
    ...plungeAttackDefault({
      element: 'pyro',
      params: params.slice(15, 18),
      stats: modifiedStats,
      modifier,
    })
  );

  return talentDamage;
}

export function yanfeiSkill({ stats, params, modifier }) {
  return skillDefault({
    element: 'pyro',
    params,
    stats,
    modifier,
  });
}

export function yanfeiBurst({ stats, params, modifier }) {
  return burstDefault({
    element: 'pyro',
    params,
    stats,
    modifier,
  });
}

// Eula
export function eulaAttack({ params, stats, modifier }) {
  return attackHeavyMulti({
    normalHits: [1, 1, 2, 1, 2],
    params,
    stats,
    modifier,
  });
}

export function eulaSkill({ params, stats, modifier }) {
  let descriptions = ['pressDmg', 'holdDmg', 'icewhirlBrandDmg'];
  return descriptions.map((description, i) => {
    return skillBase({
      description,
      element: 'cryo',
      multiplier: params[i],
      stats,
      modifier,
    });
  });
}

export function eulaBurst({ params, stats, modifier }) {
  let talentDmg = [];
  talentDmg.push(
    ...burstDefault({
      element: 'cryo',
      params,
      stats,
      modifier,
    })
  );

  let descriptions = ['lightfallSwordBaseDmg', 'lightfallSwordStackDmg'];
  let lightfallSwordParams = params.slice(1, 3);
  let lightfallSwordTalent = descriptions.map((description, i) => {
    return burstBase({
      description,
      element: 'physical',
      multiplier: lightfallSwordParams[i],
      stats,
      modifier,
    });
  });

  talentDmg.push(...lightfallSwordTalent);

  return talentDmg;
}
