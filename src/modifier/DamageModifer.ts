import { Stats } from '../data/types';
import { ModifierMixin } from '../option/Mixin';
import Resistance from '../stat/Resistance';
import { Element } from '../talent/types';
import CritType from './CritType';
import Reaction from './Reaction';

export default interface DamageModifier
  extends DamageModifierBase,
    DamageModiferOptional {}

interface DamageModifierBase {
  characterLevel: number;
  enemyLevel: number;
  enemyDefReduction: number;
  enemyRes: Resistance;
  enemyResReduction: Resistance;
  critType: CritType;
  flatDmg: number;
  reaction: Reaction;
  talentAttackLevel: number;
  talentSkillLevel: number;
  talentBurstLevel: number;
}

interface DamageModiferOptional {
  normalAttackFlatDmg?: number;
  chargedAttackFlatDmg?: number;
  skillFlatDmg?: number;

  infusion?: Element;
  infusionNormal?: Element;
  infusionPlunge?: Element;

  elementalAbsorption?: Element;

  dionaHoldSkill?: boolean;

  yoimiyaSkill?: boolean;

  thomaHpBonusDmg?: number;

  resolveStacks?: number;

  kokomiBurst?: boolean;
  kokomiHealingBonusDmg?: number;
}

export type GetDamageModifierParams = {
  characterLevel: number;
  enemyLevel: number;
  enemyRes: Resistance;
  critType: CritType;
  reaction: Reaction;
  talentAttackLevel: number;
  talentSkillLevel: number;
  talentBurstLevel: number;
  modifierMixins: ModifierMixin[];
  stats: Stats;
};

export function getDamageModifier({
  characterLevel,
  enemyLevel,
  enemyRes,
  critType,
  reaction,
  talentAttackLevel,
  talentSkillLevel,
  talentBurstLevel,
  modifierMixins,
  stats,
}: GetDamageModifierParams): DamageModifier {
  const modifier: DamageModifier = {
    characterLevel,
    enemyLevel,
    enemyDefReduction: 0,
    enemyRes,
    enemyResReduction: new Resistance(),
    critType: critType,
    flatDmg: 0,
    reaction,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
  };

  // Apply modifier mixins
  modifierMixins.forEach((mixin) => mixin.apply(modifier, stats));

  return modifier;
}
