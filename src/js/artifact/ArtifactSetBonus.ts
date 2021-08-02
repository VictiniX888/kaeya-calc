import { ArtifactSetBonusFunction } from './types';

export const artifactSetBonuses: Record<string, ArtifactSetBonusFunction> = {
  defaultSetBonus,
  Relic_ExtraAtkCritUp,
  Relic_AllElemResistUp,
  Relic_AtkAndExtraAtkUp,
  Relic_SkillDamageUp,
  Relic_MeleeAttackUp,
  Relci_RangerAttackUp,
  Relic_ElementalBurstUp,

  // Handled through Options
  Relic_GiantKiller: defaultSetBonus,
  Relic_LowHPGainExtraCritRate: defaultSetBonus,
  Relic_SkillEnhanceNormalAtkAndExtraAtk: defaultSetBonus,
  Relic_ReactionGainExtraElemMasteryForTeam: defaultSetBonus,
  Relic_CriticUpAgainstIceAndFrozen: defaultSetBonus,
  Relic_DamageUpAgainstElectric: defaultSetBonus,
  Relic_DamageUpAgainstFireAndBurning: defaultSetBonus,
  Relic_SkillEnhanceCured: defaultSetBonus,
  Relic_TeamAtkupAfterElementalBurst: defaultSetBonus,
  Relic_KillEnhanceExtraAtk: defaultSetBonus,
  Relic_ElementDmgUpAfterCrystalShield: defaultSetBonus,
  Relic_ShieldEnhanceAtk: defaultSetBonus,
  Relic_WaterSkillEnhanceNormalAtkAndExtraAtk: defaultSetBonus,
  Relic_ShieldCostUpWhenElementalArtHit: defaultSetBonus,
  Relic_AttackUpWhenNormalAtkAndExtraAtkHit: defaultSetBonus,
  Relic_NormalDamageUpIfCostEnergy: defaultSetBonus,

  // Swirl Dmg up not yet implemented. Medium priority.
  // Requires reaction dmg to be implemented first.
  Relic_ReactionWindEnhance,

  // Reaction Dmg Up not yet implemented. Medium priority
  // Requires reaction dmg to be implemented first
  Relic_ReactionFireEnhance,

  // Not yet implemented. Medium priority
  // Requires reaction dmg to be implemented first
  Relic_ReactionElectricEnhance: defaultSetBonus,

  // Not yet implemented. Low priority.
  // Requires info about team composition
  Relic_AbsorbTeamElemResist: defaultSetBonus,

  // Not yet implemented. Low priority.
  // Probably can be implemented with a dropdown option for prev received elem dmg
  Relic_ElemDmgEnhanceElemResist: defaultSetBonus,

  // Not implemented. CD reduction effect.
  Relic_KillingRefreshSkill: defaultSetBonus,

  // Not implemented. Energy effect.
  Relic_UltGainEnergyForTeam: defaultSetBonus,
  Relic_RestoreEnergyGainExtraEnergyForTeam: defaultSetBonus,

  // Not implemented. Healing effect when opening chests.
  Relic_ChestHealSelf: defaultSetBonus,

  // Not implemented. Healing effect when getting Mora.
  Relic_CoinHealSelf: defaultSetBonus,

  // Not implemented. Healing effect when burst.
  Relic_UltHealSelf: defaultSetBonus,

  // Not implemented. Element duration reduction.
  Relic_FireResistance: defaultSetBonus,
  Relic_WaterResistance: defaultSetBonus,
  Relic_ElectricResistance: defaultSetBonus,
  Relic_IceResistance: defaultSetBonus,
};

// Placeholder function
function defaultSetBonus() {
  return [];
}

function Relic_ExtraAtkCritUp(params: number[]) {
  return [
    {
      stat: 'chargedCritRate',
      value: params[0],
    },
  ];
}

function Relic_AllElemResistUp(params: number[]) {
  const elements = ['anemo', 'cryo', 'electro', 'geo', 'hydro', 'pyro'];
  return elements.map((element) => {
    return {
      stat: `${element}Res`,
      value: params[0],
    };
  });
}

function Relic_AtkAndExtraAtkUp(params: number[]) {
  return [
    {
      stat: 'normalDmgBonus',
      value: params[0],
    },
    {
      stat: 'chargedDmgBonus',
      value: params[0],
    },
  ];
}

function Relic_SkillDamageUp(params: number[]) {
  return [
    {
      stat: 'skillDmgBonus',
      value: params[0],
    },
  ];
}

function Relic_MeleeAttackUp(params: number[]) {
  // Only for sword, polearm, claymore characters
  // Did not make this an Option because this would likely not want to be disabled
  // Calculation will be wrong if used on a catalyst, bow character
  // Checking for that would require character weapon type to be implemented first
  return [
    {
      stat: 'normalDmgBonus',
      value: params[0],
    },
  ];
}

function Relic_ReactionWindEnhance() {
  // Swirl Dmg up not yet implemented. Medium priority.
  // Requires reaction dmg to be implemented first.

  // Elemental Res shred implemented through Options
  return defaultSetBonus();
}

function Relci_RangerAttackUp(params: number[]) {
  // Typo is present in the game data
  // Only for catalyst, bow characters
  // See Relic_MeleeAttackUp for more details
  return [
    {
      stat: 'chargedDmgBonus',
      value: params[0],
    },
  ];
}

function Relic_ReactionFireEnhance() {
  // Reaction Dmg Up not yet implemented. Medium priority
  // Requires reaction dmg to be implemented first

  // Pyro Dmg Bonus implemented through Options
  return defaultSetBonus();
}

function Relic_ElementalBurstUp(params: number[]) {
  return [
    {
      stat: 'burstDmgBonus',
      value: params[0],
    },
  ];
}
