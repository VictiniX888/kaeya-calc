// Placeholder function
export function defaultTalent() {
    return [];
}

// Internal functions

function getDamageBonus({ stats, element }) {
    let dmgBonus = stats[`${element}DmgBonus`];
    if (dmgBonus !== undefined) {
        return 1 + dmgBonus;
    } else {
        return 1;
    }
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

function calculateTotalDamage({ stats, multiplier, element, scalingType = 'attack', modifier }) {
    let baseDmg = calculateBaseDamage({ stats, multiplier, scalingType, flatDmg: modifier.flatDmg });
    let dmgBonus = getDamageBonus({ stats, element });

    let crit = 1;
    if (modifier.critType === 'crit') {
        crit += stats.critDmg;
    } else if (modifier.critType === 'average') {
        crit += Math.min(1, stats.critRate) * stats.critDmg;
    }

    // TODO: enemyDefMultiplier
    // TODO: enemyResMultiplier
    // TODO: reactionBonus

    return baseDmg * dmgBonus * crit;
} 

function calculateHealing({ stats, multiplier, flatHealing, scalingType = 'hp' }) {
    // TODO: Add healing bonus
    return calculateBaseDamage({ stats, multiplier, scalingType, flatDmg: flatHealing });
}

// Used for all default normal attacks
function normalAttackDefault({ hits, element, params, stats, modifier }) {
    let talentValues = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element, 
            modifier,
        });
        
        talentValues.push({
            description: `${i+1}HitDmg`,
            damage: [damage],
        });
    }

    return talentValues;
}

// Used for all normal attacks with multiple damage instances in 1 hit e.g. polearms
// doubledHits is an array containing all n where n-hit is 2 identical damage instances
function normalAttackMulti({ hits, doubledHits, element, params, stats, modifier }) {
    let talentValues = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element,
            modifier,
        });

        let damages = doubledHits.includes(i+1) ? [damage, damage] : [damage];
        
        talentValues.push({
            description: `${i+1}HitDmg`,
            damage: damages,
        });
    }

    return talentValues;
}

// Used for all 1-hit charged attacks
function chargedAttackDefault({ element, params, stats, modifier }) {
    let damage = calculateTotalDamage({ 
        stats, 
        multiplier: params[0], 
        element, 
        modifier,
     });

    return [{
        description: 'chargedDmg',
        damage: [damage],
    }];
}

// Used for multi-hit charged attacks
function chargedAttackMulti({ hits, element, params, stats, modifier }) {
    let damages = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element, 
            modifier,
        });
        damages.push(damage);
    }

    return [{
        description: `chargedDmg`,
        damage: damages,
    }];
}

// Used for all default claymore charged attacks
function chargedAttackHeavy({ params, stats, modifier }) {
    let descriptions = ['chargedSpinDmg', 'chargedFinalDmg'];
    return descriptions.map((description, i) => {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element: 'physical', 
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
            modifier 
        });

        return {
            description: description,
            damage: [damage],
        };
    });
}

// Used for all default sword/polearm/catalyst attacks
function attackLightDefault({ normalHits, element = 'physical', params, stats, modifier }) {
    let talentValues = [];

    talentValues.push(...normalAttackDefault({ 
        hits: normalHits, 
        element,
        params: params.slice(0, normalHits), 
        stats, 
        modifier 
    }));

    talentValues.push(...chargedAttackDefault({
        element,
        params: params.slice(normalHits, normalHits + 1), 
        stats, 
        modifier,
    }));

    talentValues.push(...plungeAttackDefault({
        element,
        params: params.slice(normalHits + 1 + 1), 
        stats, 
        modifier,
    }));

    return talentValues;
}

// Used for all default sword/polearm attacks with multi damage instances
function attackLightMulti({ normalHits, doubledHits = [], chargedHits = 1, element = 'physical', params, stats, modifier }) {
    let talentValues = [];

    talentValues.push(...normalAttackMulti({ 
        hits: normalHits, 
        doubledHits,
        element,
        params: params.slice(0, normalHits), 
        stats, 
        modifier 
    }));

    if (chargedHits === 1) {
        talentValues.push(...chargedAttackDefault({
            element,
            params: params.slice(normalHits, normalHits + 1), 
            stats, 
            modifier,
        }));
    } else {
        talentValues.push(...chargedAttackMulti({
            hits: chargedHits,
            element,
            params: params.slice(normalHits, normalHits + chargedHits), 
            stats, 
            modifier,
        }));
    }

    talentValues.push(...plungeAttackDefault({
        element,
        params: params.slice(normalHits + chargedHits + 1), 
        stats, 
        modifier,
    }));

    return talentValues;
}

// Used for all default claymore attacks
function attackHeavyDefault({ normalHits, element = 'physical', params, stats, modifier }) {
    let talentValues = [];

    talentValues.push(...normalAttackDefault({
        hits: normalHits, 
        element,
        params: params.slice(0, normalHits), 
        stats,
        modifier,
    }));

    talentValues.push(...chargedAttackHeavy({
        params: params.slice(normalHits, normalHits + 2), 
        stats,
        modifier,
    }));

    talentValues.push(...plungeAttackDefault({
        element,
        params: params.slice(normalHits + 2 + 2), 
        stats,
        modifier,
    }));

    return talentValues;
}

// Used for all claymore attacks with multi damage instances
function attackHeavyMulti({ normalHits, element = 'physical', doubledHits, params, stats, modifier }) {
    let talentValues = [];

    talentValues.push(...normalAttackMulti({
        hits: normalHits, 
        doubledHits,
        element,
        params: params.slice(0, normalHits), 
        stats,
        modifier,
    }));

    talentValues.push(...chargedAttackHeavy({
        params: params.slice(normalHits, normalHits + 2), 
        stats,
        modifier,
    }));

    talentValues.push(...plungeAttackDefault({
        element,
        params: params.slice(normalHits + 2 + 2), 
        stats,
        modifier,
    }));

    return talentValues;
}

// Base function for all damage skills. Returns an object representing a single line to be displayed.
// The returned object should always be added into an array to construct the list of talent damage.
function skillBase({ description, element, multiplier, stats, modifier }) {
    let damage = calculateTotalDamage({
        element,
        multiplier,
        stats, 
        modifier,
    });

    return {
        description,
        damage: [damage],
    };
}

// Used for all default skill/burst that only does 1-hit elemental dmg
function skillDefault({ element, params, stats, modifier }) {
    return [skillBase({
        description: 'skillDmg',
        element,
        multiplier: params[0],
        stats,
        modifier,
    })];
}

// Base function for all healing skills. Returns an object representing a single line to be displayed.
// The returned object should always be added into an array to construct the list of talent damage.
function healingSkillBase({ description, params, stats, modifier }) {
    let damage = calculateHealing({
        stats,
        multiplier: params[0],
        flatHealing: params[1],
    });

    return {
        description,
        damage: [damage],
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

    talentDmg.push(skillBase({
        description: 'pressDmg',
        element: 'electro',
        multiplier: params[5],
        stats,
        modifier,
    }));

    for (let i = 0; i <= 3; i++) {
        talentDmg.push(skillBase({
            description: `holdDmgStack${i}`,
            element: 'electro',
            multiplier: params[i],
            stats, 
            modifier,
        }));
    }

    return talentDmg;
}

export function lisaBurst({ params, stats, modifier }) {
    return skillDefault({
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
        normalHits: 5, 
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
        modifier 
    });
}

export function kaeyaBurst({ params, stats, modifier }) {
    return skillDefault({ 
        element: 'cryo', 
        params, 
        stats, 
        modifier,
    });
}

// Diluc
export function dilucAttack({ params, stats, modifier }) {
    let element = modifier.infusion ? modifier.infusion : 'physical';
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
        talentDamage.push(skillBase({
            description: `${i+1}HitDmg`,
            element: 'pyro',
            multiplier: params[i],
            stats,
            modifier,
        }));
    }

    return talentDamage;
}

export function dilucBurst({ params, stats, modifier }) {
    let descriptions = ['slashingDmg', 'dot', 'explosionDmg'];
    let talentDamage = descriptions.map((description, i) => {
        return skillBase({
            description,
            element: 'pyro',
            multiplier: params[i],
            stats,
            modifier,
        });
    });

    return talentDamage;
}

// Eula
export function eulaAttack({ params, stats, modifier }) {
    return attackHeavyMulti({ 
        normalHits: 5, 
        doubledHits: [3, 5],
        params, 
        stats, 
        modifier
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
    talentDmg.push(...skillDefault({
        element: 'cryo', 
        params, 
        stats,
        modifier,
    }));
    
    let descriptions = ['lightfallSwordBaseDmg', 'lightfallSwordStackDmg'];
    let lightfallSwordParams = params.slice(1, 3);
    let lightfallSwordTalent = descriptions.map((description, i) => {
        return skillBase({
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
