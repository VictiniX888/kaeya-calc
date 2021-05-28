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
