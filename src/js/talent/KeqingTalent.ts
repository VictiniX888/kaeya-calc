import Talent from './Talent';
import {
  calculateTotalDamage,
  chargedAttackMulti,
  plungeAttackDefault,
  skillBase,
  skillMultiBase,
  burstBase,
} from './TalentUtil';
import { TalentProps, AttackType, Element } from './types';

const keqingTalent: Talent = {
  attack: keqingAttack,
  skill: keqingSkill,
  burst: keqingBurst,
};

export default keqingTalent;

function keqingAttack({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  // Normal attack
  for (let i = 0; i < 3; i++) {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element: Element.Physical,
      attackType: AttackType.Normal,
      modifier,
    });
    talentDamage.push({
      description: `${i + 1}HitDmg`,
      damage: [damage],
    });
  }

  let hit4Dmg = [];
  for (let i = 3; i < 5; i++) {
    hit4Dmg.push(
      calculateTotalDamage({
        stats,
        multiplier: params[i],
        element: Element.Physical,
        attackType: AttackType.Normal,
        modifier,
      })
    );
  }
  talentDamage.push({
    description: '4HitDmg',
    damage: hit4Dmg,
  });

  let hit5Dmg = [
    calculateTotalDamage({
      stats,
      multiplier: params[5],
      element: Element.Physical,
      attackType: AttackType.Normal,
      modifier,
    }),
  ];
  talentDamage.push({
    description: `5HitDmg`,
    damage: hit5Dmg,
  });

  // Charged attack
  talentDamage.push(
    ...chargedAttackMulti({
      hits: 2,
      element: Element.Physical,
      params: params.slice(6, 8),
      stats,
      modifier,
    })
  );

  // Plunge attack
  talentDamage.push(
    ...plungeAttackDefault({
      element: Element.Physical,
      params: params.slice(9, 12),
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function keqingSkill({ params, stats, modifier }: TalentProps) {
  let descriptions = ['lightningStilettoDmg', 'slashingDmg'];
  let talentDamage = descriptions.map((description, i) => {
    return skillBase({
      description,
      element: Element.Electro,
      multiplier: params[i],
      stats,
      modifier,
    });
  });

  talentDamage.push(
    skillMultiBase({
      description: 'thunderclapSlashDmg',
      hits: 2,
      element: Element.Electro,
      params: [params[2], params[2]],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function keqingBurst({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  talentDamage.push(
    burstBase({
      description: 'burstInitDmg',
      element: Element.Electro,
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  let consecutiveSlashDmg = calculateTotalDamage({
    stats,
    multiplier: params[1],
    element: Element.Electro,
    attackType: AttackType.Burst,
    modifier,
  });
  talentDamage.push({
    description: 'consecutiveSlashDmg',
    damage: Array(8).fill(consecutiveSlashDmg),
  });

  talentDamage.push(
    burstBase({
      description: 'lastAttackDmg',
      element: Element.Electro,
      multiplier: params[2],
      stats,
      modifier,
    })
  );

  return talentDamage;
}
