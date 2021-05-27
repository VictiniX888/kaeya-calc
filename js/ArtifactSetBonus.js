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
