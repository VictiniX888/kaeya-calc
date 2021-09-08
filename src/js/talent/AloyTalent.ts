import Talent from './Talent';
import {
  aimShotDefault,
  burstDefault,
  calculateTotalDamage,
  plungeAttackDefault,
  skillBase,
} from './TalentUtil';
import { AttackType, Element, TalentProps, TalentValue } from './types';

const aloyTalent: Talent = {
  attack: aloyAttack,
  skill: aloySkill,
  burst: aloyBurst,
};

export default aloyTalent;

function aloyAttack({ params, stats, modifier }: TalentProps) {
  let talentValues: TalentValue[] = [];

  // 1-hit
  const hit1Dmg = params.slice(0, 2).map((multiplier) =>
    calculateTotalDamage({
      stats,
      multiplier,
      element: modifier.infusion ?? Element.Physical,
      attackType: AttackType.Normal,
      modifier,
    })
  );
  talentValues.push({ description: '1HitDmg', damage: hit1Dmg });

  // 2-4 hit
  for (let i = 2; i <= 4; i++) {
    const dmg = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element: modifier.infusion ?? Element.Physical,
      attackType: AttackType.Normal,
      modifier,
    });
    talentValues.push({ description: `${i}HitDmg`, damage: [dmg] });
  }

  // Charged attack
  talentValues.push(
    ...aimShotDefault({
      chargedElement: Element.Cryo,
      params: params.slice(5, 7),
      stats,
      modifier,
    })
  );

  // Plunge attack
  talentValues.push(
    ...plungeAttackDefault({
      element: Element.Physical,
      params: params.slice(7, 10),
      stats,
      modifier,
    })
  );

  return talentValues;
}

function aloySkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'freezeBombDmg',
      element: Element.Cryo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillBase({
      description: 'chillwaterBombletDmg',
      element: Element.Cryo,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

function aloyBurst({ params, stats, modifier }: TalentProps) {
  return burstDefault({
    element: Element.Cryo,
    params,
    stats,
    modifier,
  });
}
