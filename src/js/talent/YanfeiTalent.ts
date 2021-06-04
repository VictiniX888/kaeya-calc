import Talent from './Talent';
import {
  normalAttackDefault,
  calculateTotalDamage,
  plungeAttackDefault,
  skillDefault,
  burstDefault,
} from './TalentUtil';
import { TalentProps, AttackType, Element } from './types';

const yanfeiTalent: Talent = {
  attack: yanfeiAttack,
  skill: yanfeiSkill,
  burst: yanfeiBurst,
};

export default yanfeiTalent;

function yanfeiAttack({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  // Normal attack
  talentDamage.push(
    ...normalAttackDefault({
      hits: 3,
      element: Element.Pyro,
      params,
      stats,
      modifier,
    })
  );

  // Charged attack
  for (let i = 0; i < 5; i++) {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i + 3],
      element: Element.Pyro,
      attackType: AttackType.Charged,
      modifier,
    });
    talentDamage.push({
      description: `chargedDmgSeal${i}`,
      damage: [damage],
    });
  }

  // Plunge attack
  talentDamage.push(
    ...plungeAttackDefault({
      element: Element.Pyro,
      params: params.slice(15, 18),
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function yanfeiSkill({ params, stats, modifier }: TalentProps) {
  return skillDefault({
    element: Element.Pyro,
    params,
    stats,
    modifier,
  });
}

function yanfeiBurst({ params, stats, modifier }: TalentProps) {
  return burstDefault({
    element: Element.Pyro,
    params,
    stats,
    modifier,
  });
}
