import type { PropMapping } from './types';

export default {
  baseHp: {
    name: 'Base HP',
    isPercentage: false,
  },
  baseAtk: {
    name: 'Base ATK',
    isPercentage: false,
  },
  baseDef: {
    name: 'Base DEF',
    isPercentage: false,
  },
  hpBonus: {
    name: 'HP%',
    isPercentage: true,
  },
  atkBonus: {
    name: 'ATK%',
    isPercentage: true,
  },
  defBonus: {
    name: 'DEF%',
    isPercentage: true,
  },
  critRate: {
    name: 'Crit Rate',
    isPercentage: true,
  },
  critDmg: {
    name: 'Crit DMG',
    isPercentage: true,
  },
  elementalMastery: {
    name: 'Elemental Mastery',
    isPercentage: false,
  },
  energyRecharge: {
    name: 'Energy Recharge',
    isPercentage: true,
  },
  healingBonus: {
    name: 'Healing Bonus',
    isPercentage: true,
  },
  pyroDmgBonus: {
    name: 'Pyro DMG%',
    isPercentage: true,
  },
  electroDmgBonus: {
    name: 'Electro DMG%',
    isPercentage: true,
  },
  cryoDmgBonus: {
    name: 'Cryo DMG%',
    isPercentage: true,
  },
  hydroDmgBonus: {
    name: 'Hydro DMG%',
    isPercentage: true,
  },
  anemoDmgBonus: {
    name: 'Anemo DMG%',
    isPercentage: true,
  },
  geoDmgBonus: {
    name: 'Geo DMG%',
    isPercentage: true,
  },
  physicalDmgBonus: {
    name: 'Physical DMG%',
    isPercentage: true,
  },
  pyroRes: {
    name: 'Pyro RES',
    isPercentage: true,
  },
  electroRes: {
    name: 'Electro RES',
    isPercentage: true,
  },
  cryoRes: {
    name: 'Cryo RES',
    isPercentage: true,
  },
  hydroRes: {
    name: 'Hydro RES',
    isPercentage: true,
  },
  anemoRes: {
    name: 'Anemo RES',
    isPercentage: true,
  },
  geoRes: {
    name: 'Geo RES',
    isPercentage: true,
  },
  shieldStrength: {
    name: 'Shield Strength',
    isPercentage: true,
  },
  dmgBonus: {
    name: 'DMG Bonus',
    isPercentage: true,
  },
  flatHp: {
    name: 'HP',
    isPercentage: false,
  },
  flatAtk: {
    name: 'ATK',
    isPercentage: false,
  },
  flatDef: {
    name: 'DEF',
    isPercentage: false,
  },
  healedBonus: {
    name: 'Incoming Healing Bonus',
    isPercentage: true,
  },

  normalDmgBonus: {
    name: 'Normal Atk DMG Bonus',
    isPercentage: true,
  },
  chargedDmgBonus: {
    name: 'Charged Atk DMG Bonus',
    isPercentage: true,
  },
  plungeDmgBonus: {
    name: 'Plunge Atk DMG Bonus',
    isPercentage: true,
  },
  skillDmgBonus: {
    name: 'Skill DMG Bonus',
    isPercentage: true,
  },
  burstDmgBonus: {
    name: 'Burst DMG Bonus',
    isPercentage: true,
  },

  chargedCritRate: {
    name: 'Charged Atk Crit Rate',
    isPercentage: true,
  },
} as PropMapping;
