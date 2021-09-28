import { Stats } from '../../data/types';
import { getArtifactSetBonusParams } from '../Data';
import archaicPetraOptions from '../option/artifactSetOptions/ArchaicPetraOption';
import berserkerOptions from '../option/artifactSetOptions/BerserkerOption';
import blizzardStrayerOptions from '../option/artifactSetOptions/BlizzardStrayerOption';
import bloodstainedChivalryOptions from '../option/artifactSetOptions/BloodstainedChivalryOption';
import braveHeartOptions from '../option/artifactSetOptions/BraveHeartOption';
import crimsonWitchOptions from '../option/artifactSetOptions/CrimsonWitchOption';
import heartOfDepthOptions from '../option/artifactSetOptions/HeartOfDepthOption';
import instructorOptions from '../option/artifactSetOptions/InstructorOption';
import lavawalkerOptions from '../option/artifactSetOptions/LavawalkerOption';
import maidenBelovedOptions from '../option/artifactSetOptions/MaidenBelovedOption';
import martialArtistOptions from '../option/artifactSetOptions/MartialArtistOption';
import noblesseObligeOptions from '../option/artifactSetOptions/NoblesseObligeOption';
import paleFlameOptions from '../option/artifactSetOptions/PaleFlameOption';
import retracingBolideOptions from '../option/artifactSetOptions/RetracingBolideOption';
import shimenawaOptions from '../option/artifactSetOptions/ShimenawaOption';
import tenacityOptions from '../option/artifactSetOptions/TenacityOption';
import thundersootherOptions from '../option/artifactSetOptions/ThundersootherOption';
import viridescentVenererOptions from '../option/artifactSetOptions/ViridescentVenererOption';
import { Priority } from '../option/Mixin';
import { ArtifactSetBonus } from './types';

// Placeholder function
const defaultSetBonus: ArtifactSetBonus = { options: [] };

const Relic_ExtraAtkCritUp: ArtifactSetBonus = {
  options: [],

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
  options: [],

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
  options: [],

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
  options: [],

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
  options: [],

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
const Relic_ReactionWindEnhance: ArtifactSetBonus = {
  options: viridescentVenererOptions,
};

const Relci_RangerAttackUp: ArtifactSetBonus = {
  options: [],

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
const Relic_ReactionFireEnhance: ArtifactSetBonus = {
  options: crimsonWitchOptions,
};

const Relic_ElementalBurstUp: ArtifactSetBonus = {
  options: [],

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
  options: [],

  statMixin: {
    priority: Priority.Last,
    apply: (stats: Stats) => {
      const params = getArtifactSetBonusParams('emblemofseveredfate', 4);
      let burstDmgBonus = params[0] * stats.energyRecharge;
      if (burstDmgBonus > params[1]) {
        burstDmgBonus = params[1];
      }

      stats.burstDmgBonus = burstDmgBonus + (stats.burstDmgBonus ?? 0);
    },
  },
};

const Relic_GiantKiller: ArtifactSetBonus = {
  options: braveHeartOptions,
};

const Relic_LowHPGainExtraCritRate: ArtifactSetBonus = {
  options: berserkerOptions,
};

const Relic_SkillEnhanceNormalAtkAndExtraAtk: ArtifactSetBonus = {
  options: martialArtistOptions,
};

const Relic_ReactionGainExtraElemMasteryForTeam: ArtifactSetBonus = {
  options: instructorOptions,
};

const Relic_CriticUpAgainstIceAndFrozen: ArtifactSetBonus = {
  options: blizzardStrayerOptions,
};

const Relic_DamageUpAgainstElectric: ArtifactSetBonus = {
  options: thundersootherOptions,
};

const Relic_DamageUpAgainstFireAndBurning: ArtifactSetBonus = {
  options: lavawalkerOptions,
};

const Relic_SkillEnhanceCured: ArtifactSetBonus = {
  options: maidenBelovedOptions,
};

const Relic_TeamAtkupAfterElementalBurst: ArtifactSetBonus = {
  options: noblesseObligeOptions,
};

const Relic_KillEnhanceExtraAtk: ArtifactSetBonus = {
  options: bloodstainedChivalryOptions,
};

const Relic_ElementDmgUpAfterCrystalShield: ArtifactSetBonus = {
  options: archaicPetraOptions,
};

const Relic_ShieldEnhanceAtk: ArtifactSetBonus = {
  options: retracingBolideOptions,
};

const Relic_WaterSkillEnhanceNormalAtkAndExtraAtk: ArtifactSetBonus = {
  options: heartOfDepthOptions,
};

const Relic_ShieldCostUpWhenElementalArtHit: ArtifactSetBonus = {
  options: tenacityOptions,
};

const Relic_AttackUpWhenNormalAtkAndExtraAtkHit: ArtifactSetBonus = {
  options: paleFlameOptions,
};

const Relic_NormalDamageUpIfCostEnergy: ArtifactSetBonus = {
  options: shimenawaOptions,
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

  // Options only
  Relic_GiantKiller,
  Relic_LowHPGainExtraCritRate,
  Relic_SkillEnhanceNormalAtkAndExtraAtk,
  Relic_ReactionGainExtraElemMasteryForTeam,
  Relic_CriticUpAgainstIceAndFrozen,
  Relic_DamageUpAgainstElectric,
  Relic_DamageUpAgainstFireAndBurning,
  Relic_SkillEnhanceCured,
  Relic_TeamAtkupAfterElementalBurst,
  Relic_KillEnhanceExtraAtk,
  Relic_ElementDmgUpAfterCrystalShield,
  Relic_ShieldEnhanceAtk,
  Relic_WaterSkillEnhanceNormalAtkAndExtraAtk,
  Relic_ShieldCostUpWhenElementalArtHit,
  Relic_AttackUpWhenNormalAtkAndExtraAtkHit,
  Relic_NormalDamageUpIfCostEnergy,

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
