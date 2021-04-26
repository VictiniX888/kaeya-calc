import { getDamageBonus } from './Stat.js';

// Placeholder function
export function defaultTalent() {
    return [];
}

// Internal functions

// Used for all default normal attacks
function normalAttackDefault(hits, params, stats) {
    let talentValues = [];
    let dmgBonus = getDamageBonus('physical', stats);
    for (let i = 0; i < hits; i++) {
        let damage = stats.flatAtk * params[i] * dmgBonus;
        talentValues.push({
            description: `${i+1}HitDmg`,
            damage: damage,
        });
    }

    return talentValues;
}

// Used for all 1-hit charged attacks
function chargedAttackDefault(params, stats) {
    let dmgBonus = getDamageBonus('physical', stats);
    let damage = stats.flatAtk * params[0] * dmgBonus;
    return [{
        description: 'chargedDmg',
        damage: damage,
    }];
}

// Used for multi-hit charged attacks
function chargedAttackMulti(hits, params, stats) {
    let talentValues = [];
    let dmgBonus = getDamageBonus('physical', stats);
    for (let i = 0; i < hits; i++) {
        let damage = stats.flatAtk * params[i] * dmgBonus;
        talentValues.push({
            description: `charged${i+1}HitDmg`,
            damage: damage,
        });
    }

    return talentValues;
}

// Used for all default claymore charged attacks
function chargedAttackHeavy(params, stats) {
    let descriptions = ['chargedSpinDmg', 'chargedFinalDmg'];
    let dmgBonus = getDamageBonus('physical', stats);
    return descriptions.map((description, i) => {
        let damage = stats.flatAtk * params[i] * dmgBonus;
        return {
            description: description,
            damage: damage,
        };
    });
}

// Used for all default plunge attacks
function plungeAttackDefault(params, stats) {
    let descriptions = ['plungeDmg', 'lowPlungeDmg', 'highPlungeDmg'];
    let dmgBonus = getDamageBonus('physical', stats);
    return descriptions.map((description, i) => {
        let damage = stats.flatAtk * params[i] * dmgBonus;
        return {
            description: description,
            damage: damage,
        };
    });
}

// Used for all default sword/polearm/catalyst attacks
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

// Used for all default claymore attacks
function attackHeavyDefault(normalHits, params, stats) {
    let talentValues = [];
    talentValues.push(...normalAttackDefault(normalHits, params.slice(0, normalHits), stats));
    talentValues.push(...chargedAttackHeavy(params.slice(normalHits, normalHits + 2), stats));
    talentValues.push(...plungeAttackDefault(params.slice(normalHits + 2 + 2), stats));
    return talentValues;
}

// Used for all default skill/burst that only does 1-hit elemental dmg
function skillDefault(element, params, stats) {
    let dmgBonus = getDamageBonus(element, stats);
    let damage = stats.flatAtk * params[0] * dmgBonus;

    return [{
        description: 'dmg',
        damage: damage,
    }];
}

// Public functions
// Access using talent[characterId + type]

// Kaeya
export function kaeyaAttack(params, stats) {
    return attackLightDefault(5, 2, params, stats);
}

export function kaeyaSkill(params, stats) {
    return skillDefault('cryo', params, stats);
}

export function kaeyaBurst(params, stats) {
    return skillDefault('cryo', params, stats);
}

// Eula
export function eulaAttack(params, stats) {
    return attackHeavyDefault(5, params, stats);
}

export function eulaSkill(params, stats) {
    let descriptions = ['pressDmg', 'holdDmg', 'icewhirlBrandDmg'];
    let dmgBonus = getDamageBonus('cryo', stats);
    return descriptions.map((description, i) => {
        let damage = stats.flatAtk * params[i] * dmgBonus;
        return {
            description: description,
            damage: damage,
        };
    });
}

export function eulaBurst(params, stats) {
    let talentDmg = [];
    talentDmg.push(...skillDefault('cryo', params, stats));
    
    let descriptions = ['lightfallSwordBaseDmg', 'lightfallSwordStackDmg'];
    let lightfallSwordParams = params.slice(1, 3);
    let dmgBonus = getDamageBonus('physical', stats);
    let lightfallSwordTalent = descriptions.map((description, i) => {
        let damage = stats.flatAtk * lightfallSwordParams[i] * dmgBonus;
        return {
            description: description,
            damage: damage,
        };
    });

    talentDmg.push(...lightfallSwordTalent);

    return talentDmg;
}