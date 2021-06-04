import type Resistance from '../Resistance';
import type { Element } from '../talent/types';

export default interface DamageModifier
  extends DamageModifierBase,
    DamageModiferOptional {}

interface DamageModifierBase {
  characterLevel: number;
  enemyLevel: number;
  enemyDefReduction: number;
  enemyRes: Resistance;
  enemyResReduction: Resistance;
  modifiers: any;
  critType: string;
  flatDmg: number;
  reaction: string;
  talentAttackLevel: number;
  talentSkillLevel: number;
  talentBurstLevel: number;
}

interface DamageModiferOptional {
  infusion?: Element;

  dionaHoldSkill?: boolean;
}
