import Talent from './Talent';
import {
  burstBase,
  calculateTotalDamage,
  chargedAttackMulti,
  plungeAttackDefault,
  skillBase,
} from './TalentUtil';
import { AttackType, Element, TalentProps, TalentValue } from './types';

const kazuhaTalent: Talent = {
  attack: kazuhaAttack,
  skill: kazuhaSkill,
  burst: kazuhaBurst,
};

export default kazuhaTalent;

function kazuhaAttack({ params, stats, modifier }: TalentProps) {
  let talentValues: TalentValue[] = [];

  // Normal attack
  for (let i = 0; i < 2; i++) {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element: Element.Physical,
      attackType: AttackType.Normal,
      modifier,
    });
    talentValues.push({
      description: `${i + 1}HitDmg`,
      damage: [damage],
    });
  }

  let hit3Dmg = [];
  for (let i = 2; i < 4; i++) {
    hit3Dmg.push(
      calculateTotalDamage({
        stats,
        multiplier: params[i],
        element: Element.Physical,
        attackType: AttackType.Normal,
        modifier,
      })
    );
  }
  talentValues.push({
    description: '3HitDmg',
    damage: hit3Dmg,
  });

  let hit4Dmg = [
    calculateTotalDamage({
      stats,
      multiplier: params[4],
      element: Element.Physical,
      attackType: AttackType.Normal,
      modifier,
    }),
  ];
  talentValues.push({
    description: `4HitDmg`,
    damage: hit4Dmg,
  });

  let hit5Dmg = [];
  const hit5DmgSingle = calculateTotalDamage({
    stats,
    multiplier: params[5],
    element: Element.Physical,
    attackType: AttackType.Normal,
    modifier,
  });
  for (let i = 0; i < 3; i++) {
    hit5Dmg.push(hit5DmgSingle);
  }
  talentValues.push({
    description: `5HitDmg`,
    damage: hit5Dmg,
  });

  // Charged attack
  talentValues.push(
    ...chargedAttackMulti({
      hits: 2,
      element: Element.Physical,
      params: params.slice(6, 8),
      stats,
      modifier,
    })
  );

  // Plunge attack
  talentValues.push(
    ...plungeAttackDefault({
      element: modifier.infusionPlunge ?? Element.Physical,
      params: params.slice(9, 12),
      stats,
      modifier,
    })
  );

  return talentValues;
}

function kazuhaSkill({ params, stats, modifier }: TalentProps) {
  const descriptions = ['pressDmg', 'holdDmg'];
  return descriptions.map((description, i) =>
    skillBase({
      description,
      element: Element.Anemo,
      multiplier: params[i * 2],
      stats,
      modifier,
    })
  );
}

function kazuhaBurst({ params, stats, modifier }: TalentProps) {
  const descriptions = ['slashingDmg', 'dot'];
  let talentValues = descriptions.map((description, i) =>
    burstBase({
      description,
      element: Element.Anemo,
      multiplier: params[i],
      stats,
      modifier,
    })
  );

  talentValues.push(
    burstBase({
      description: 'dotElementalAbsorption',
      element: Element.Anemo,
      multiplier: params[2],
      stats,
      modifier,
    })
  );

  return talentValues;
}
