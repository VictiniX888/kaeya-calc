import type Resistance from '../Resistance';
import type { Element } from '../talent/types';
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

  infusion?: Element;
  elementalAbsorption?: Element;

  dionaHoldSkill?: boolean;

  infusionPlunge?: Element;

  yoimiyaSkill?: boolean;

  resolveStacks?: number;

  kokomiBurst?: boolean;
  kokomiHealingBonusDmg?: number;
}
