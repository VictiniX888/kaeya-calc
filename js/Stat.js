import { talentDescMapping, optionMapping } from './Data.js';

// Returns the string to display as the value of a stat
export function getStatDisplayValue(value, isPercentage) {
  if (value != null) {
    if (isPercentage) {
      return (value * 100).toFixed(1) + '%';
    } else {
      return Math.round(value);
    }
  } else {
    return '-';
  }
}

// Returns the string to display as the talent damage
export function getDamageDisplayValue(values) {
  let str = '';

  if (values.length === 0) {
    return str;
  }

  if (isNaN(values[0])) {
    return '-';
  } else {
    str += Math.round(values[0]);
  }

  if (values.length >= 3 && values.every((value) => value === values[0])) {
    // All elements are the same, simplify to ${damage} x${count}
    str += ' x ' + values.length;
  } else {
    // Less than 3 elements, or elements are different
    values.slice(1).forEach((value) => {
      if (isNaN(value)) {
        return '-';
      } else {
        str += ' + ' + Math.round(value);
      }
    });
  }

  return str;
}

// Returns the display name of a talent option
export function getOptionName(id) {
  return optionMapping[id];
}

// Returns a Number representing the inputed value of a stat
// Returns null if the input is not a valid stat value
export function convertStatValue(value, isPercentage) {
  if (isPercentage) {
    return value / 100;
  } else {
    return value;
  }
}

export function getTalentDescription(desc) {
  return talentDescMapping[desc];
}

// Returns object containing base stats of character with the passed weapon
// Base stats = character innate stats + weapon stats
function getBaseStatsAt(
  weapon,
  weaponLevel,
  weaponHasAscended,
  character,
  characterLevel,
  characterHasAscended
) {
  let weaponStats;
  if (weapon !== undefined) {
    weaponStats = weapon.getStatsAt(weaponLevel, weaponHasAscended);
  } else {
    weaponStats = {};
  }

  let characterStats;
  if (character !== undefined) {
    characterStats = character.getInnateStatsAt(
      characterLevel,
      characterHasAscended
    );
  } else {
    characterStats = {};
  }

  // Merges weaponStats and innateStats into a new baseStats object
  let baseStats = { ...weaponStats };
  Object.entries(characterStats).map(([stat, value]) => {
    if (baseStats[stat] === undefined) {
      baseStats[stat] = value;
    } else {
      baseStats[stat] += value;
    }
  });

  return baseStats;
}

// Returns object containing the total stats of the character, weapon and artifacts
// Ignores any of [character, weapon] that are undefined
export function getTotalStatsAt(
  weapon,
  weaponLevel,
  weaponHasAscended,
  character,
  characterLevel,
  characterHasAscended,
  artifactSetBonuses,
  artifacts,
  characterOptions,
  talentAttackLevel,
  talentSkillLevel,
  talentBurstLevel
) {
  let baseStats = getBaseStatsAt(
    weapon,
    weaponLevel,
    weaponHasAscended,
    character,
    characterLevel,
    characterHasAscended
  );
  let combinedStats = { ...baseStats };

  // Merge base stats and artifact set bonuses
  if (artifactSetBonuses !== undefined) {
    Object.entries(artifactSetBonuses).forEach(([stat, value]) => {
      if (combinedStats[stat] === undefined) {
        combinedStats[stat] = value;
      } else {
        combinedStats[stat] += value;
      }
    });
  }

  // Merge artifact bonuses into separate object
  let artifactStats = {};
  artifacts.forEach((artifact) => {
    Object.entries(artifact.getStats()).forEach(([stat, value]) => {
      if (artifactStats[stat] === undefined) {
        artifactStats[stat] = value;
      } else {
        artifactStats[stat] += value;
      }
    });
  });

  // Merge base stats and artifact bonuses
  Object.entries(artifactStats).forEach(([stat, value]) => {
    if (combinedStats[stat] === undefined) {
      combinedStats[stat] = value;
    } else {
      combinedStats[stat] += value;
    }
  });

  // Apply character options (only)
  characterOptions.forEach((option) => {
    option.applyOnStats(
      combinedStats,
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel
    );
  });

  // Calculate total stats
  let totalStats = {};

  totalStats.baseAtk = combinedStats.baseAtk ? combinedStats.baseAtk : 0;

  totalStats.flatAtk =
    (combinedStats.baseAtk ? combinedStats.baseAtk : 0) *
      (1 + (combinedStats.atkBonus ? combinedStats.atkBonus : 0)) +
    (combinedStats.flatAtk ? combinedStats.flatAtk : 0);
  totalStats.flatDef =
    (combinedStats.baseDef ? combinedStats.baseDef : 0) *
      (1 + (combinedStats.defBonus ? combinedStats.defBonus : 0)) +
    (combinedStats.flatDef ? combinedStats.flatDef : 0);
  totalStats.flatHp =
    (combinedStats.baseHp ? combinedStats.baseHp : 0) *
      (1 + (combinedStats.hpBonus ? combinedStats.hpBonus : 0)) +
    (combinedStats.flatHp ? combinedStats.flatHp : 0);
  totalStats.critRate = combinedStats.critRate ? combinedStats.critRate : 0;
  totalStats.critDmg = combinedStats.critDmg ? combinedStats.critDmg : 0;
  totalStats.elementalMastery = combinedStats.elementalMastery
    ? combinedStats.elementalMastery
    : 0;
  totalStats.energyRecharge =
    1 + (combinedStats.energyRecharge ? combinedStats.energyRecharge : 0);

  combinedStats.anemoDmgBonus
    ? (totalStats.anemoDmgBonus = combinedStats.anemoDmgBonus)
    : null;
  combinedStats.cryoDmgBonus
    ? (totalStats.cryoDmgBonus = combinedStats.cryoDmgBonus)
    : null;
  combinedStats.electroDmgBonus
    ? (totalStats.electroDmgBonus = combinedStats.electroDmgBonus)
    : null;
  combinedStats.geoDmgBonus
    ? (totalStats.geoDmgBonus = combinedStats.geoDmgBonus)
    : null;
  combinedStats.hydroDmgBonus
    ? (totalStats.hydroDmgBonus = combinedStats.hydroDmgBonus)
    : null;
  combinedStats.pyroDmgBonus
    ? (totalStats.pyroDmgBonus = combinedStats.pyroDmgBonus)
    : null;
  combinedStats.physicalDmgBonus
    ? (totalStats.physicalDmgBonus = combinedStats.physicalDmgBonus)
    : null;

  combinedStats.anemoRes
    ? (totalStats.anemoRes = combinedStats.anemoRes)
    : null;
  combinedStats.cryoRes ? (totalStats.cryoRes = combinedStats.cryoRes) : null;
  combinedStats.electroRes
    ? (totalStats.electroRes = combinedStats.electroRes)
    : null;
  combinedStats.geoRes ? (totalStats.geoRes = combinedStats.geoRes) : null;
  combinedStats.hydroRes
    ? (totalStats.hydroRes = combinedStats.hydroRes)
    : null;
  combinedStats.pyroRes ? (totalStats.pyroRes = combinedStats.pyroRes) : null;
  combinedStats.physicalRes
    ? (totalStats.physicalRes = combinedStats.physicalRes)
    : null;

  combinedStats.healingBonus
    ? (totalStats.healingBonus = combinedStats.healingBonus)
    : null;

  combinedStats.shieldStrength
    ? (totalStats.shieldStrength = combinedStats.shieldStrength)
    : null;
  combinedStats.dmgBonus
    ? (totalStats.dmgBonus = combinedStats.dmgBonus)
    : null;
  combinedStats.normalDmgBonus
    ? (totalStats.normalDmgBonus = combinedStats.normalDmgBonus)
    : null;
  combinedStats.chargedDmgBonus
    ? (totalStats.chargedDmgBonus = combinedStats.chargedDmgBonus)
    : null;
  combinedStats.plungeDmgBonus
    ? (totalStats.plungeDmgBonus = combinedStats.plungeDmgBonus)
    : null;
  combinedStats.skillDmgBonus
    ? (totalStats.skillDmgBonus = combinedStats.skillDmgBonus)
    : null;
  combinedStats.burstDmgBonus
    ? (totalStats.burstDmgBonus = combinedStats.burstDmgBonus)
    : null;
  combinedStats.chargedCritRate
    ? (totalStats.chargedCritRate = combinedStats.chargedCritRate)
    : null;

  return totalStats;
}

export function capitalize(str) {
  return str[0].toUpperCase().concat(str.slice(1));
}
