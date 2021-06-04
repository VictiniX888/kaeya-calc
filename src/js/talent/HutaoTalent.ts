import Talent from './Talent';
import {
  normalAttackDefault,
  calculateTotalDamage,
  chargedAttackDefault,
  plungeAttackDefault,
  skillBase,
  burstBase,
  healingSkillBase,
} from './TalentUtil';
import { TalentProps, AttackType, TalentValue, Element } from './types';

const hutaoTalent: Talent = {
  attack: hutaoAttack,
  skill: hutaoSkill,
  burst: hutaoBurst,
};

export default hutaoTalent;

function hutaoAttack({ params, stats, modifier }: TalentProps) {
  const element = modifier.infusion ?? Element.Physical;

  let talentDamage = [];

  // Normal attack
  talentDamage.push(
    ...normalAttackDefault({
      hits: 4,
      element,
      params,
      stats,
      modifier,
    })
  );

  let hit5Dmg = [];
  for (let i = 4; i < 6; i++) {
    hit5Dmg.push(
      calculateTotalDamage({
        stats,
        multiplier: params[i],
        element,
        attackType: AttackType.Normal,
        modifier,
      })
    );
  }
  talentDamage.push({
    description: '5HitDmg',
    damage: hit5Dmg,
  });

  let hit6Dmg = [
    calculateTotalDamage({
      stats,
      multiplier: params[6],
      element,
      attackType: AttackType.Normal,
      modifier,
    }),
  ];
  talentDamage.push({
    description: '6HitDmg',
    damage: hit6Dmg,
  });

  // Charged attack
  talentDamage.push(
    ...chargedAttackDefault({
      element,
      params: params.slice(7, 8),
      stats,
      modifier,
    })
  );

  // Plunge attack
  talentDamage.push(
    ...plungeAttackDefault({
      element,
      params: params.slice(9, 12),
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function hutaoSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'bloodBlossomDmg',
      element: Element.Pyro,
      multiplier: params[2],
      stats,
      modifier,
    }),
  ];
}

function hutaoBurst({ params, stats, modifier }: TalentProps) {
  let talentDamage: TalentValue[] = [];

  let dmgDescriptions = ['burstDmg', 'burstDmgLowHp'];
  dmgDescriptions.forEach((description, i) => {
    talentDamage.push(
      burstBase({
        description,
        element: Element.Pyro,
        multiplier: params[i],
        stats,
        modifier,
      })
    );
  });

  let regenDescriptions = ['hpRegen', 'hpRegenLowHp'];
  regenDescriptions.forEach((description, i) => {
    talentDamage.push(
      healingSkillBase({
        description,
        params: [params[i + 2], 0],
        stats,
        modifier,
      })
    );
  });

  return talentDamage;
}
