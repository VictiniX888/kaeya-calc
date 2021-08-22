import { Stats } from '../../data/types';
import { getArtifactSetBonusParams } from '../Data';
import { ArtifactSetBonus } from './types';

// Placeholder function
const defaultSetBonus: ArtifactSetBonus = {};

const Relic_ExtraAtkCritUp: ArtifactSetBonus = {
  extraStatsFn: (params: number[]) => {
    return [
      {
        stat: 'chargedCritRate',
        value: params[0],
      },
    ];
  },
};

const Relic_AllElemResistUp: ArtifactSetBonus = {
  extraStatsFn: (params: number[]) => {
    const elements = ['anemo', 'cryo', 'electro', 'geo', 'hydro', 'pyro'];
    return elements.map((element) => {
      return {
        stat: `${element}Res`,
        value: params[0],
      };
    });
  },
};

const Relic_AtkAndExtraAtkUp: ArtifactSetBonus = {
  extraStatsFn: (params: number[]) => {
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
  },
};

const Relic_SkillDamageUp: ArtifactSetBonus = {
  extraStatsFn: (params: number[]) => {
    return [
      {
        stat: 'skillDmgBonus',
        value: params[0],
      },
    ];
  },
};

const Relic_MeleeAttackUp: ArtifactSetBonus = {
  extraStatsFn: (params: number[]) => {
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
  },
};

// Swirl Dmg up not yet implemented. Medium priority.
// Requires reaction dmg to be implemented first.
// Elemental Res shred implemented through Options
const Relic_ReactionWindEnhance: ArtifactSetBonus = defaultSetBonus;

const Relci_RangerAttackUp: ArtifactSetBonus = {
  extraStatsFn: (params: number[]) => {
    // Typo is present in the game data
    // Only for catalyst, bow characters
    // See Relic_MeleeAttackUp for more details
    return [
      {
        stat: 'chargedDmgBonus',
        value: params[0],
      },
    ];
  },
};

// Reaction Dmg Up not yet implemented. Medium priority
// Requires reaction dmg to be implemented first
// Pyro Dmg Bonus implemented through Options
const Relic_ReactionFireEnhance: ArtifactSetBonus = defaultSetBonus;

const Relic_ElementalBurstUp: ArtifactSetBonus = {
  extraStatsFn: (params: number[]) => {
    return [
      {
        stat: 'burstDmgBonus',
        value: params[0],
      },
    ];
  },
};

const Relic_ElementalBurstUpByChargeEfficiency: ArtifactSetBonus = {
  statMixin: (stats: Stats) => {
    const params = getArtifactSetBonusParams('emblemofseveredfate', 4);
    let burstDmgBonus = params[0] * stats.energyRecharge;
    if (burstDmgBonus > params[1]) {
      burstDmgBonus = params[1];
    }

    stats.burstDmgBonus = burstDmgBonus + (stats.burstDmgBonus ?? 0);
  },
};

export const artifactSetBonuses: Record<string, ArtifactSetBonus> = {
  defaultSetBonus,
  Relic_ExtraAtkCritUp,
  Relic_AllElemResistUp,
  Relic_AtkAndExtraAtkUp,
  Relic_SkillDamageUp,
  Relic_MeleeAttackUp,
  Relci_RangerAttackUp,
  Relic_ElementalBurstUp,
  Relic_ElementalBurstUpByChargeEfficiency,

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
