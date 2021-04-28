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

function calculateTotalDamage({ stats, multiplier, element, characterLevel, enemyLevel, enemyRes, modifiers, scalingType = 'attack', critType = 'none', flatDmg = 0, reaction = 'none' }) {
    let baseDmg = calculateBaseDamage({ stats, multiplier, scalingType, flatDmg });
    let dmgBonus = getDamageBonus({ stats, element });

    let crit = 1;
    if (critType === 'crit') {
        crit += stats.critDmg;
    } else if (critType === 'average') {
        crit += Math.min(1, stats.critRate) * stats.critDmg;
    }

    // TODO: enemyDefMultiplier
    // TODO: enemyResMultiplier
    // TODO: reactionBonus

    return baseDmg * dmgBonus * crit;
}

// Used for all default normal attacks
function normalAttackDefault({ hits, params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let talentValues = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element: 'physical', 
            characterLevel,
            enemyLevel,
            enemyRes,
            modifiers,
            critType,
        });
        
        talentValues.push({
            description: `${i+1}HitDmg`,
            damage: [damage],
        });
    }

    return talentValues;
}

// Used for all 1-hit charged attacks
function chargedAttackDefault({ params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let damage = calculateTotalDamage({ 
        stats, 
        multiplier: params[0], 
        element: 'physical', 
        characterLevel,
        enemyLevel,
        enemyRes,
        modifiers,
        critType,
    });

    return [{
        description: 'chargedDmg',
        damage: [damage],
    }];
}

// Used for multi-hit charged attacks
function chargedAttackMulti({ hits, params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let damages = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element: 'physical', 
            characterLevel,
            enemyLevel,
            enemyRes,
            modifiers,
            critType,
        });

        damages.push(damage);
    }

    return [{
        description: `chargedDmg`,
        damage: damages,
    }];
}

// Used for all default claymore charged attacks
function chargedAttackHeavy({ params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let descriptions = ['chargedSpinDmg', 'chargedFinalDmg'];
    return descriptions.map((description, i) => {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element: 'physical', 
            characterLevel,
            enemyLevel,
            enemyRes,
            modifiers,
            critType,
        });

        return {
            description: description,
            damage: [damage],
        };
    });
}

// Used for all default plunge attacks
function plungeAttackDefault({ params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let descriptions = ['plungeDmg', 'lowPlungeDmg', 'highPlungeDmg'];
    return descriptions.map((description, i) => {
        let damage = calculateTotalDamage({ 
            stats, 
            multiplier: params[i], 
            element: 'physical', 
            characterLevel,
            enemyLevel,
            enemyRes,
            modifiers,
            critType,
        });

        return {
            description: description,
            damage: [damage],
        };
    });
}

// Used for all default sword/polearm/catalyst attacks
function attackLightDefault({ normalHits, chargedHits = 1, params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let talentValues = [];

    talentValues.push(...normalAttackDefault({
        hits: normalHits,
        params: params.slice(0, normalHits), 
        stats, 
        characterLevel,
        enemyLevel,
        enemyRes,
        modifiers,
        critType,
    }));

    if (chargedHits === 1) {
        talentValues.push(...chargedAttackDefault({
            params: params.slice(normalHits, normalHits + 1), 
            stats, 
            characterLevel,
            enemyLevel,
            enemyRes,
            modifiers,
            critType,
        }));
    } else {
        talentValues.push(...chargedAttackMulti({
            hits: chargedHits,
            params: params.slice(normalHits, normalHits + chargedHits), 
            stats, 
            characterLevel,
            enemyLevel,
            enemyRes,
            modifiers,
            critType,
        }));
    }

    talentValues.push(...plungeAttackDefault({
        params: params.slice(normalHits + chargedHits + 1), 
        stats, 
        characterLevel,
        enemyLevel,
        enemyRes,
        modifiers,
        critType,
    }));

    return talentValues;
}

// Used for all default claymore attacks
function attackHeavyDefault({ normalHits, params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let talentValues = [];

    talentValues.push(...normalAttackDefault({
        hits: normalHits, 
        params: params.slice(0, normalHits), 
        stats,
        characterLevel,
        enemyLevel,
        enemyRes,
        modifiers,
        critType,
    }));

    talentValues.push(...chargedAttackHeavy({
        params: params.slice(normalHits, normalHits + 2), 
        stats,
        characterLevel,
        enemyLevel,
        enemyRes,
        modifiers,
        critType,
    }));

    talentValues.push(...plungeAttackDefault({
        params: params.slice(normalHits + 2 + 2), 
        stats,
        characterLevel,
        enemyLevel,
        enemyRes,
        modifiers,
        critType,
    }));

    return talentValues;
}

// Used for all default skill/burst that only does 1-hit elemental dmg
function skillDefault({ element, params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let damage = calculateTotalDamage({
        element,
        multiplier: params[0],
        stats, 
        characterLevel,
        enemyLevel,
        enemyRes,
        modifiers,
        critType,
    });

    return [{
        description: 'dmg',
        damage: [damage],
    }];
}

// TODO?: Replace { stats, characterLevel, enemyLevel, enemyRes, modifiers, critType } with a single un-destructured object/class

// Public functions
// Access using talent[characterId + type]

// Kaeya
export function kaeyaAttack({ params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    return attackLightDefault({ normalHits: 5, chargedHits: 2, params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType });
}

export function kaeyaSkill({ params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    return skillDefault({ element: 'cryo', params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType });
}

export function kaeyaBurst({ params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    return skillDefault({ element: 'cryo', params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType });
}

// Eula
export function eulaAttack({ params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    return attackHeavyDefault({ normalHits: 5, params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType });
}

export function eulaSkill({ params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let descriptions = ['pressDmg', 'holdDmg', 'icewhirlBrandDmg'];
    return descriptions.map((description, i) => {
        let damage = calculateTotalDamage({
            element: 'cryo',
            multiplier: params[i],
            stats, 
            characterLevel,
            enemyLevel,
            enemyRes,
            modifiers,
            critType,
        });

        return {
            description: description,
            damage: [damage],
        };
    });
}

export function eulaBurst({ params, stats, characterLevel, enemyLevel, enemyRes, modifiers, critType }) {
    let talentDmg = [];
    talentDmg.push(...skillDefault({
        element: 'cryo', 
        params, 
        stats,
        characterLevel,
        enemyLevel,
        enemyRes,
        modifiers,
        critType,
    }));
    
    let descriptions = ['lightfallSwordBaseDmg', 'lightfallSwordStackDmg'];
    let lightfallSwordParams = params.slice(1, 3);
    let lightfallSwordTalent = descriptions.map((description, i) => {
        let damage = calculateTotalDamage({
            element: 'physical',
            multiplier: lightfallSwordParams[i],
            stats, 
            characterLevel,
            enemyLevel,
            enemyRes,
            modifiers,
            critType,
        });
        return {
            description: description,
            damage: [damage],
        };
    });

    talentDmg.push(...lightfallSwordTalent);

    return talentDmg;
}
