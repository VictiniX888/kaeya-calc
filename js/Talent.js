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

// Used for all default normal attacks
function normalAttackDefault({ hits, params, stats, modifier }) {
    let talentValues = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element: 'physical', 
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
function normalAttackMulti({ hits, doubledHits, params, stats, modifier }) {
    let talentValues = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element: 'physical', 
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
function chargedAttackDefault({ params, stats, modifier }) {
    let damage = calculateTotalDamage({ 
        stats, 
        multiplier: params[0], 
        element: 'physical', 
        modifier
     });

    return [{
        description: 'chargedDmg',
        damage: [damage],
    }];
}

// Used for multi-hit charged attacks
function chargedAttackMulti({ hits, params, stats, modifier }) {
    let damages = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element: 'physical', 
            modifier 
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
            modifier 
        });

        return {
            description: description,
            damage: [damage],
        };
    });
}

// Used for all default plunge attacks
function plungeAttackDefault({ params, stats, modifier }) {
    let descriptions = ['plungeDmg', 'lowPlungeDmg', 'highPlungeDmg'];
    return descriptions.map((description, i) => {
        let damage = calculateTotalDamage({ 
            stats,
            multiplier: params[i], 
            element: 'physical', 
            modifier 
        });

        return {
            description: description,
            damage: [damage],
        };
    });
}

// Used for all default sword/polearm/catalyst attacks
function attackLightDefault({ normalHits, params, stats, modifier }) {
    let talentValues = [];

    talentValues.push(...normalAttackDefault({ 
        hits: normalHits, 
        params: params.slice(0, normalHits), 
        stats, 
        modifier 
    }));

    talentValues.push(...chargedAttackDefault({
        params: params.slice(normalHits, normalHits + 1), 
        stats, 
        modifier,
    }));

    talentValues.push(...plungeAttackDefault({
        params: params.slice(normalHits + chargedHits + 1), 
        stats, 
        modifier,
    }));

    return talentValues;
}

// Used for all default sword/polearm/catalyst attacks with multi damage instances
function attackLightMulti({ normalHits, doubledHits = [], chargedHits = 1, params, stats, modifier }) {
    let talentValues = [];

    talentValues.push(...normalAttackMulti({ 
        hits: normalHits, 
        doubledHits,
        params: params.slice(0, normalHits), 
        stats, 
        modifier 
    }));

    if (chargedHits === 1) {
        talentValues.push(...chargedAttackDefault({
            params: params.slice(normalHits, normalHits + 1), 
            stats, 
            modifier,
        }));
    } else {
        talentValues.push(...chargedAttackMulti({
            hits: chargedHits,
            params: params.slice(normalHits, normalHits + chargedHits), 
            stats, 
            modifier,
        }));
    }

    talentValues.push(...plungeAttackDefault({
        params: params.slice(normalHits + chargedHits + 1), 
        stats, 
        modifier,
    }));

    return talentValues;
}

// Used for all default claymore attacks
function attackHeavyDefault({ normalHits, params, stats, modifier }) {
    let talentValues = [];

    talentValues.push(...normalAttackDefault({
        hits: normalHits, 
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
        params: params.slice(normalHits + 2 + 2), 
        stats,
        modifier,
    }));

    return talentValues;
}

// Used for all claymore attacks with multi damage instances
function attackHeavyMulti({ normalHits, doubledHits, params, stats, modifier }) {
    let talentValues = [];

    talentValues.push(...normalAttackMulti({
        hits: normalHits, 
        doubledHits,
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
        params: params.slice(normalHits + 2 + 2), 
        stats,
        modifier,
    }));

    return talentValues;
}

// Base function for all skills. Returns an object representing a single line to be displayed.
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

// Public functions
// Access using talent[characterId + type]

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
