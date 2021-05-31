// Placeholder function
export function defaultSetBonus() {
  return [];
}

export function Relic_ExtraAtkCritUp(params) {
  return [
    {
      stat: 'chargedCritRate',
      value: params[0],
    },
  ];
}

export function Relic_GiantKiller() {
  // Handled through Options
  return defaultSetBonus();
}

export function Relic_AbsorbTeamElemResist() {
  // Not yet implemented. Low priority.
  // Requires info about team composition
  return defaultSetBonus();
}

export function Relic_AllElemResistUp(params) {
  const elements = ['anemo', 'cryo', 'electro', 'geo', 'hydro', 'pyro'];
  return elements.map((element) => {
    return {
      stat: `${element}Res`,
      value: params[0],
    };
  });
}

export function Relic_ElemDmgEnhanceElemResist() {
  // Not yet implemented. Low priority.
  // Probably can be implemented with a dropdown option for prev received elem dmg
  return defaultSetBonus();
}

export function Relic_LowHPGainExtraCritRate() {
  // Handled through Options
  return defaultSetBonus();
}

export function Relic_AtkAndExtraAtkUp(params) {
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

export function Relic_SkillEnhanceNormalAtkAndExtraAtk() {
  // Handled through Options
  return defaultSetBonus();
}

export function Relic_ReactionGainExtraElemMasteryForTeam() {
  // Handled through Options
  return defaultSetBonus();
}

export function Relic_SkillDamageUp(params) {
  return [
    {
      stat: 'skillDmgBonus',
      value: params[0],
    },
  ];
}

export function Relic_KillingRefreshSkill() {
  // Not implemented. CD reduction effect.
  return defaultSetBonus();
}

export function Relic_UltGainEnergyForTeam() {
  // Not implemented. Energy effect.
  return defaultSetBonus();
}

export function Relic_ChestHealSelf() {
  // Not implemented. Healing effect when opening chests.
  return defaultSetBonus();
}

export function Relic_CoinHealSelf() {
  // Not implemented. Healing effect when getting Mora.
  return defaultSetBonus();
}

export function Relic_RestoreEnergyGainExtraEnergyForTeam() {
  // Not implemented. Energy effect.
  return defaultSetBonus();
}

export function Relic_UltHealSelf() {
  // Not implemented. Healing effect when burst.
  return defaultSetBonus();
}

export function Relic_CriticUpAgainstIceAndFrozen() {
  // Handled through Options
  return defaultSetBonus();
}

export function Relic_DamageUpAgainstElectric() {
  // Handled through Options
  return defaultSetBonus();
}

export function Relic_DamageUpAgainstFireAndBurning() {
  // Handled through Options
  return defaultSetBonus();
}

export function Relic_SkillEnhanceCured() {
  // Handled through Options
  return defaultSetBonus();
}

export function Relic_MeleeAttackUp(params) {
  // Only for sword, polearm, claymore characters
  // Did not make this an Option because this would likely not want to be disabled
  return [
    {
      stat: 'normalDmgBonus',
      value: params[0],
    },
  ];
}

export function Relic_ReactionWindEnhance() {
  // Swirl Dmg up not yet implemented. Medium priority.
  // Requires reaction dmg to be implemented first.

  // Elemental Res shred implemented through Options
  return defaultSetBonus();
}
