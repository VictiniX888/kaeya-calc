// Placeholder function
export function defaultTalent() {
    return [];
}

// Internal functions

function getDamageBonus(stats, element) {
    let dmgBonus = stats[`${element}DmgBonus`];
    if (dmgBonus !== undefined) {
        return 1 + dmgBonus;
    } else {
        return 1;
    }
}

function calculateBaseDamage(stats, multiplier, scalingType, flatDmg = 0) {
    if (scalingType == 'attack') {
        return stats.flatAtk * multiplier + flatDmg;
    } else if (scalingType == 'defense') {
        return stats.flatDef * multiplier + flatDmg;
    } else {
        return NaN;
    }
}

function calculateTotalDamage(stats, multiplier, scalingType, element, critType = 'none', flatDmg = 0) {
    let baseDmg = calculateBaseDamage(stats, multiplier, scalingType, flatDmg);
    let dmgBonus = getDamageBonus(stats, element);

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
function normalAttackDefault(params, stats, critType, hits) {
    let talentValues = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage(stats, params[i], 'attack', 'physical', critType);
        talentValues.push({
            description: `${i+1}HitDmg`,
            damage: damage,
        });
    }

    return talentValues;
}

// Used for all 1-hit charged attacks
function chargedAttackDefault(params, stats, critType) {
    let damage = calculateTotalDamage(stats, params[0], 'attack', 'physical', critType);
    return [{
        description: 'chargedDmg',
        damage: damage,
    }];
}

// Used for multi-hit charged attacks
function chargedAttackMulti(params, stats, critType, hits) {
    let talentValues = [];
    for (let i = 0; i < hits; i++) {
        let damage = calculateTotalDamage(stats, params[i], 'attack', 'physical', critType);
        talentValues.push({
            description: `charged${i+1}HitDmg`,
            damage: damage,
        });
    }

    return talentValues;
}

// Used for all default plunge attacks
function plungeAttackDefault(params, stats, critType) {
    let descriptions = ['plungeDmg', 'lowPlungeDmg', 'highPlungeDmg'];
    return descriptions.map((description, i) => {
        let damage = calculateTotalDamage(stats, params[i], 'attack', 'physical', critType);
        return {
            description: description,
            damage: damage,
        };
    });
}

// Used for all default sword/polearm/catalyst attacks
function attackLightDefault(params, stats, critType, normalHits, chargedHits) {
    let talentValues = [];

    talentValues.push(...normalAttackDefault(params.slice(0, normalHits), stats, critType, normalHits));

    if (chargedHits === 1) {
        talentValues.push(...chargedAttackDefault(params.slice(normalHits, normalHits + 1), stats, critType));
    } else {
        talentValues.push(...chargedAttackMulti(params.slice(normalHits, normalHits + chargedHits), stats, critType, chargedHits));
    }

    talentValues.push(...plungeAttackDefault(params.slice(normalHits + chargedHits + 1), stats, critType));

    return talentValues;
}

// Used for all default skill/burst that only does 1-hit elemental dmg
function skillDefault(params, stats, critType, element) {
    let damage = calculateTotalDamage(stats, params[0], 'attack', element, critType);

    return [{
        description: 'dmg',
        damage: damage,
    }];
}

// Public functions
// Access using talent[characterId + type]

// Kaeya
export function kaeyaAttack(params, stats, critType) {
    return attackLightDefault(params, stats, critType, 5, 2);
}

export function kaeyaSkill(params, stats, critType) {
    return skillDefault(params, stats, critType, 'cryo');
}

export function kaeyaBurst(params, stats, critType) {
    return skillDefault(params, stats, critType, 'cryo');
}
