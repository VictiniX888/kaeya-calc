import Talent from './Talent';
import {
  normalAttackMulti,
  calculateTotalDamage,
  chargedAttackDefault,
  plungeAttackDefault,
  skillMultiBase,
  burstMultiBase,
  burstBase,
} from './TalentUtil';
import { TalentProps, AttackType, Element } from './types';

const rosariaTalent: Talent = {
  attack: rosariaAttack,
  skill: rosariaSkill,
  burst: rosariaBurst,
};

export default rosariaTalent;

function rosariaAttack({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  // Normal attack
  talentDamage.push(
    ...normalAttackMulti({
      hits: [1, 1, 2, 1],
      element: Element.Physical,
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
        element: Element.Physical,
        attackType: AttackType.Normal,
        modifier,
      })
    );
  }
  talentDamage.push({
    description: '5HitDmg',
    damage: hit5Dmg,
  });

  // Charged attack
  talentDamage.push(
    ...chargedAttackDefault({
      element: Element.Physical,
      params: params.slice(6, 7),
      stats,
      modifier,
    })
  );

  // Plunge attack
  talentDamage.push(
    ...plungeAttackDefault({
      element: Element.Physical,
      params: params.slice(8, 11),
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function rosariaSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillMultiBase({
      description: 'skillDmg',
      hits: 2,
      element: Element.Cryo,
      params,
      stats,
      modifier,
    }),
  ];
}

function rosariaBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstMultiBase({
      description: 'burstDmg',
      hits: 2,
      element: Element.Cryo,
      params,
      stats,
      modifier,
    }),

    burstBase({
      description: 'iceLanceDot',
      element: Element.Cryo,
      multiplier: params[2],
      stats,
      modifier,
    }),
  ];
}
