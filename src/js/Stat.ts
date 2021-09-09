import { Stats } from '../data/types';
import Artifact from './artifact/Artifact';
import Character, { getAscensionLevel } from './character/Character';
import { talentDescMapping, optionMapping, propMapping } from './Data';
import { StatMixin } from './option/Mixin';
import Weapon from './weapon/Weapon';

// Returns the string to display as the value of a stat
export function getStatDisplayValue(prop: string, value: number) {
  const isPercentage = propMapping[prop]?.isPercentage;
  if (value != null && !isNaN(value)) {
    if (isPercentage) {
      return (value * 100).toFixed(1) + '%';
    } else {
      return Math.round(value).toString();
    }
  } else {
    return '-';
  }
}

// Returns the string to display as the talent damage
export function getDamageDisplayValue(values: number[]) {
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
export function getOptionName(id: string) {
  return optionMapping[id];
}

// Returns a Number representing the inputed value of a stat
export function convertStatValue(value: number, isPercentage: boolean) {
  if (isPercentage) {
    return value / 100;
  } else {
    return value;
  }
}

export function getTalentDescription(desc: string) {
  return talentDescMapping[desc];
}

// Returns object containing base stats of character with the passed weapon
// Base stats = character innate stats + weapon stats
function getBaseStatsAt(character: Character, weapon: Weapon) {
  let characterStats;
  if (character !== undefined) {
    characterStats = character.innateStats;
  } else {
    characterStats = {};
  }

  let weaponStats;
  if (weapon !== undefined) {
    weaponStats = weapon.stats;
  } else {
    weaponStats = {};
  }

  // Merges weaponStats and innateStats into a new baseStats object
  let baseStats = { ...weaponStats };
  Object.entries(characterStats).forEach(([stat, value]) => {
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
  character: Character,
  weapon: Weapon,
  artifactSetBonuses: Stats,
  artifacts: Artifact[],
  talentAttackLevel: number,
  talentSkillLevel: number,
  talentBurstLevel: number,
  statMixins: StatMixin[]
) {
  let baseStats = getBaseStatsAt(character, weapon);
  let combinedStats = { ...baseStats };

  // Merge artifact bonuses into separate object
  let artifactStats: Stats = {};
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

  // Add base 100% energy recharge
  combinedStats.energyRecharge = 1 + (combinedStats.energyRecharge ?? 0);

  // Apply stat mixins
  statMixins.forEach((mixin) =>
    mixin(
      combinedStats,
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
      getAscensionLevel(character.level, character.hasAscended)
    )
  );

  // Calculate total stats
  let totalStats: Stats = {};

  totalStats.baseAtk = combinedStats.baseAtk ?? 0;

  totalStats.flatAtk =
    (combinedStats.baseAtk ?? 0) * (1 + (combinedStats.atkBonus ?? 0)) +
    (combinedStats.flatAtk ?? 0);
  totalStats.flatDef =
    (combinedStats.baseDef ?? 0) * (1 + (combinedStats.defBonus ?? 0)) +
    (combinedStats.flatDef ?? 0);
  totalStats.flatHp =
    (combinedStats.baseHp ?? 0) * (1 + (combinedStats.hpBonus ?? 0)) +
    (combinedStats.flatHp ?? 0);
  totalStats.critRate = combinedStats.critRate ?? 0;
  totalStats.critDmg = combinedStats.critDmg ?? 0;
  totalStats.elementalMastery = combinedStats.elementalMastery ?? 0;
  totalStats.energyRecharge = combinedStats.energyRecharge ?? 0;

  if (combinedStats.anemoDmgBonus !== undefined) {
    totalStats.anemoDmgBonus = combinedStats.anemoDmgBonus;
  }
  if (combinedStats.cryoDmgBonus !== undefined) {
    totalStats.cryoDmgBonus = combinedStats.cryoDmgBonus;
  }
  if (combinedStats.electroDmgBonus !== undefined) {
    totalStats.electroDmgBonus = combinedStats.electroDmgBonus;
  }
  if (combinedStats.geoDmgBonus !== undefined) {
    totalStats.geoDmgBonus = combinedStats.geoDmgBonus;
  }
  if (combinedStats.hydroDmgBonus !== undefined) {
    totalStats.hydroDmgBonus = combinedStats.hydroDmgBonus;
  }
  if (combinedStats.pyroDmgBonus !== undefined) {
    totalStats.pyroDmgBonus = combinedStats.pyroDmgBonus;
  }
  if (combinedStats.physicalDmgBonus !== undefined) {
    totalStats.physicalDmgBonus = combinedStats.physicalDmgBonus;
  }

  if (combinedStats.anemoRes !== undefined) {
    totalStats.anemoRes = combinedStats.anemoRes;
  }
  if (combinedStats.cryoRes !== undefined) {
    totalStats.cryoRes = combinedStats.cryoRes;
  }
  if (combinedStats.electroRes !== undefined) {
    totalStats.electroRes = combinedStats.electroRes;
  }
  if (combinedStats.geoRes !== undefined) {
    totalStats.geoRes = combinedStats.geoRes;
  }
  if (combinedStats.hydroRes !== undefined) {
    totalStats.hydroRes = combinedStats.hydroRes;
  }
  if (combinedStats.pyroRes !== undefined) {
    totalStats.pyroRes = combinedStats.pyroRes;
  }
  if (combinedStats.physicalRes !== undefined) {
    totalStats.physicalRes = combinedStats.physicalRes;
  }

  if (combinedStats.healingBonus !== undefined) {
    totalStats.healingBonus = combinedStats.healingBonus;
  }

  if (combinedStats.shieldStrength !== undefined) {
    totalStats.shieldStrength = combinedStats.shieldStrength;
  }
  if (combinedStats.dmgBonus !== undefined) {
    totalStats.dmgBonus = combinedStats.dmgBonus;
  }
  if (combinedStats.normalDmgBonus !== undefined) {
    totalStats.normalDmgBonus = combinedStats.normalDmgBonus;
  }
  if (combinedStats.chargedDmgBonus !== undefined) {
    totalStats.chargedDmgBonus = combinedStats.chargedDmgBonus;
  }
  if (combinedStats.plungeDmgBonus !== undefined) {
    totalStats.plungeDmgBonus = combinedStats.plungeDmgBonus;
  }
  if (combinedStats.skillDmgBonus !== undefined) {
    totalStats.skillDmgBonus = combinedStats.skillDmgBonus;
  }
  if (combinedStats.burstDmgBonus !== undefined) {
    totalStats.burstDmgBonus = combinedStats.burstDmgBonus;
  }
  if (combinedStats.chargedCritRate !== undefined) {
    totalStats.chargedCritRate = combinedStats.chargedCritRate;
  }
  if (combinedStats.burstCritRate !== undefined) {
    totalStats.burstCritRate = combinedStats.burstCritRate;
  }

  return totalStats;
}

export function capitalize(str: string) {
  if (str.length > 0) {
    return str[0].toUpperCase().concat(str.slice(1));
  } else {
    return str;
  }
}
