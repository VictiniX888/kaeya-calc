import type { ArtifactSetBonusDataRaw } from './types';

export default [
  {
    setId: 'resolutionofsojourner',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'atkBonus',
            value: 0.18000000715255737,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ExtraAtkCritUp',
          params: [0.30000001192092896, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'braveheart',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'atkBonus',
            value: 0.18000000715255737,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_GiantKiller',
          params: [0.30000001192092896, 0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'defenderswill',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'defBonus',
            value: 0.30000001192092896,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_AbsorbTeamElemResist',
          params: [0.30000001192092896, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'tinymiracle',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_AllElemResistUp',
          params: [0.20000000298023224, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ElemDmgEnhanceElemResist',
          params: [0.30000001192092896, 10.0, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'berserker',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'critRate',
            value: 0.11999999731779099,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_LowHPGainExtraCritRate',
          params: [
            0.23999999463558197, 0.699999988079071, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0,
          ],
        },
      },
    ],
  },
  {
    setId: 'martialartist',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_AtkAndExtraAtkUp',
          params: [0.15000000596046448, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_SkillEnhanceNormalAtkAndExtraAtk',
          params: [8.0, 1.0, 0.25, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'instructor',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'elementalMastery',
            value: 80.0,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ReactionGainExtraElemMasteryForTeam',
          params: [8.0, 120.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'gambler',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_SkillDamageUp',
          params: [0.20000000298023224, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_KillingRefreshSkill',
          params: [15.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'theexile',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'energyRecharge',
            value: 0.20000000298023224,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_UltGainEnergyForTeam',
          params: [2.0, 6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'adventurer',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'flatHp',
            value: 1000.0,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ChestHealSelf',
          params: [5.0, 1.0, 0.05999999865889549, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'luckydog',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'flatDef',
            value: 100.0,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_CoinHealSelf',
          params: [300.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'scholar',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'energyRecharge',
            value: 0.20000000298023224,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_RestoreEnergyGainExtraEnergyForTeam',
          params: [3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'travelingdoctor',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'healedBonus',
            value: 0.20000000298023224,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_UltHealSelf',
          params: [0.20000000298023224, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'blizzardstrayer',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'cryoDmgBonus',
            value: 0.15000000596046448,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_CriticUpAgainstIceAndFrozen',
          params: [
            0.20000000298023224, 0.20000000298023224, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0,
          ],
        },
      },
    ],
  },
  {
    setId: 'thundersoother',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'electroRes',
            value: 0.4000000059604645,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_DamageUpAgainstElectric',
          params: [0.3499999940395355, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'lavawalker',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'pyroRes',
            value: 0.4000000059604645,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_DamageUpAgainstFireAndBurning',
          params: [0.3499999940395355, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'maidenbeloved',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'healingBonus',
            value: 0.15000000596046448,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_SkillEnhanceCured',
          params: [0.20000000298023224, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'gladiatorsfinale',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'atkBonus',
            value: 0.18000000715255737,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_MeleeAttackUp',
          params: [0.3499999940395355, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'viridescentvenerer',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'anemoDmgBonus',
            value: 0.15000000596046448,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ReactionWindEnhance',
          params: [
            0.6000000238418579, 0.4000000059604645, 10.0, 0.0, 0.0, 0.0, 0.0,
            0.0,
          ],
        },
      },
    ],
  },
  {
    setId: 'wandererstroupe',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'elementalMastery',
            value: 80.0,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relci_RangerAttackUp',
          params: [0.3499999940395355, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'thunderingfury',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'electroDmgBonus',
            value: 0.15000000596046448,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ReactionElectricEnhance',
          params: [
            0.4000000059604645, 0.800000011920929, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
          ],
        },
      },
    ],
  },
  {
    setId: 'crimsonwitchofflames',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'pyroDmgBonus',
            value: 0.15000000596046448,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ReactionFireEnhance',
          params: [
            0.4000000059604645, 0.15000000596046448, 0.15000000596046448, 0.5,
            10.0, 0.0, 0.0, 0.0,
          ],
        },
      },
    ],
  },
  {
    setId: 'noblesseoblige',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ElementalBurstUp',
          params: [0.20000000298023224, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_TeamAtkupAfterElementalBurst',
          params: [0.20000000298023224, 12.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'bloodstainedchivalry',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'physicalDmgBonus',
            value: 0.25,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_KillEnhanceExtraAtk',
          params: [10.0, 0.5, -5.0, 0.10000000149011612, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'prayersforillumination',
    setBonusSet: [
      {
        bonusThreshold: 1,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_FireResistance',
          params: [0.4000000059604645, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'prayersfordestiny',
    setBonusSet: [
      {
        bonusThreshold: 1,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_WaterResistance',
          params: [0.4000000059604645, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'prayersforwisdom',
    setBonusSet: [
      {
        bonusThreshold: 1,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ElectricResistance',
          params: [0.4000000059604645, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'prayerstospringtime',
    setBonusSet: [
      {
        bonusThreshold: 1,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_IceResistance',
          params: [0.4000000059604645, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'archaicpetra',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'geoDmgBonus',
            value: 0.15000000596046448,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ElementDmgUpAfterCrystalShield',
          params: [0.3499999940395355, 10.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'retracingbolide',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'shieldStrength',
            value: 0.3499999940395355,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ShieldEnhanceAtk',
          params: [0.4000000059604645, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'heartofdepth',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'hydroDmgBonus',
            value: 0.15000000596046448,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_WaterSkillEnhanceNormalAtkAndExtraAtk',
          params: [0.30000001192092896, 1.0, 15.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
    ],
  },
  {
    setId: 'tenacityofthemillelith',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'hpBonus',
            value: 0.20000000298023224,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_ShieldCostUpWhenElementalArtHit',
          params: [
            0.20000000298023224, 0.30000001192092896, 3.0, 0.5, 0.0, 0.0, 0.0,
            0.0,
          ],
        },
      },
    ],
  },
  {
    setId: 'paleflame',
    setBonusSet: [
      {
        bonusThreshold: 2,
        bonuses: [
          {
            stat: 'physicalDmgBonus',
            value: 0.25,
          },
        ],
        bonusExtra: {
          type: '',
          params: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        },
      },
      {
        bonusThreshold: 4,
        bonuses: [],
        bonusExtra: {
          type: 'Relic_AttackUpWhenNormalAtkAndExtraAtkHit',
          params: [
            0.09000000357627869, 7.0, 0.30000001192092896, 0.25, 0.0, 0.0, 0.0,
            0.0,
          ],
        },
      },
    ],
  },
] as ArtifactSetBonusDataRaw[];
