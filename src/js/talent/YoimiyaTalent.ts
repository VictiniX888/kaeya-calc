import { getTalentData, getTalentStatsAt } from '../Data';
import { defaultTalentFn } from './DefaultTalent';
import Talent from './Talent';
import {
  burstBase,
  calculateTotalDamage,
  normalAttackMulti,
  plungeAttackDefault,
} from './TalentUtil';
import { AttackType, Element, TalentProps, TalentType } from './types';

const yoimiyaTalent: Talent = {
  attack: yoimiyaAttack,
  skill: yoimiyaSkill,
  burst: yoimiyaBurst,
};

export default yoimiyaTalent;

function yoimiyaAttack({ params, stats, modifier }: TalentProps) {
  let talentValues = [];

  // Normal attack
  let normalAttackParams = params.slice(0, 5);
  if (modifier.yoimiyaSkill) {
    const skillParams = getTalentStatsAt(
      TalentType.Skill,
      modifier.talentSkillLevel,
      getTalentData('yoimiya')
    );
    normalAttackParams = normalAttackParams.map(
      (param) => param * skillParams[3]
    );
  }

  talentValues.push(
    ...normalAttackMulti({
      hits: [2, 1, 1, 2, 1],
      element: modifier.infusion ?? Element.Physical,
      params: normalAttackParams,
      stats,
      modifier,
    })
  );

  // Charged attack
  let aimedShotDmg = calculateTotalDamage({
    stats,
    multiplier: params[5],
    element: Element.Physical,
    attackType: AttackType.Normal,
    modifier,
  });
  talentValues.push({
    description: 'aimShotDmg',
    damage: [aimedShotDmg],
  });

  let chargedAimedShotDmg = calculateTotalDamage({
    stats,
    multiplier: params[6],
    element: Element.Pyro,
    attackType: AttackType.Charged,
    modifier,
  });
  talentValues.push({
    description: 'chargedAimShotDmg',
    damage: [chargedAimedShotDmg],
  });

  let kindlingArrowDmg = calculateTotalDamage({
    stats,
    multiplier: params[7],
    element: Element.Pyro,
    attackType: AttackType.Charged,
    modifier,
  });
  talentValues.push({
    description: 'kindlingArrowDmg',
    damage: [kindlingArrowDmg],
  });

  // Plunge attack
  talentValues.push(
    ...plungeAttackDefault({
      element: Element.Physical,
      params: params.slice(8, 11),
      stats,
      modifier,
    })
  );

  return talentValues;
}

function yoimiyaSkill({ params, stats, modifier }: TalentProps) {
  return defaultTalentFn();
}

function yoimiyaBurst({ params, stats, modifier }: TalentProps) {
  const descriptions = ['burstDmg', 'aurousBlazeExplosionDmg'];

  return descriptions.map((description, i) =>
    burstBase({
      description,
      element: Element.Pyro,
      multiplier: params[i],
      stats,
      modifier,
    })
  );
}
