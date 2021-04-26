// Placeholder function
export function defaultTalent() {
    return [];
}

// Internal function: Used for all default normal attacks
function normalAttackDefault(hits, params, stats) {
    let talentValues = [];
    for (let i = 0; i < hits; i++) {
        let damage = stats.flatAtk * params[i];
        talentValues.push({
            description: `${i+1}HitDmg`,
            damage: damage,
        });
    }

    return talentValues;
}

// Internal function: Used for all 1-hit charged attacks
function chargedAttackDefault(params, stats) {
    let damage = stats.flatAtk * params[0];
    return [{
        description: 'chargedDmg',
        damage: damage,
    }];
}

// Internal function: Used for multi-hit charged attacks
function chargedAttackMulti(hits, params, stats) {
    let talentValues = [];
    for (let i = 0; i < hits; i++) {
        let damage = stats.flatAtk * params[i];
        talentValues.push({
            description: `charged${i+1}HitDmg`,
            damage: damage,
        });
    }

    return talentValues;
}

// Internal function: Used for all default plunge attacks
function plungeAttackDefault(params, stats) {
    let descriptions = ['plungeDmg', 'lowPlungeDmg', 'highPlungeDmg'];
    return descriptions.map((description, i) => {
        let damage = stats.flatAtk * params[i];
        return {
            description: description,
            damage: damage,
        };
    });
}

// Internal function: Used for all default sword/polearm/catalyst attacks
function attackLightDefault(normalHits, chargedHits, params, stats) {
    let talentValues = [];

    talentValues.push(...normalAttackDefault(normalHits, params.slice(0, normalHits), stats));

    if (chargedHits === 1) {
        talentValues.push(...chargedAttackDefault(params[normalHits], stats));
    } else {
        talentValues.push(...chargedAttackMulti(chargedHits, params.slice(normalHits, normalHits + chargedHits), stats));
    }

    talentValues.push(...plungeAttackDefault(params.slice(normalHits + chargedHits + 1), stats));

    return talentValues;
}
