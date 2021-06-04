import Talent from './Talent';
import { attackHeavyDefault, skillBase, burstBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const dilucTalent: Talent = {
  attack: dilucAttack,
  skill: dilucSkill,
  burst: dilucBurst,
};

export default dilucTalent;

function dilucAttack({ params, stats, modifier }: TalentProps) {
  const element = modifier.infusion ?? Element.Physical;
  return attackHeavyDefault({
    normalHits: 4,
    element,
    params,
    stats,
    modifier,
  });
}

function dilucSkill({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];
  for (let i = 0; i < 3; i++) {
    talentDamage.push(
      skillBase({
        description: `${i + 1}HitDmg`,
        element: Element.Pyro,
        multiplier: params[i],
        stats,
        modifier,
      })
    );
  }

  return talentDamage;
}

function dilucBurst({ params, stats, modifier }: TalentProps) {
  let descriptions = ['slashingDmg', 'dot', 'explosionDmg'];
  let talentDamage = descriptions.map((description, i) => {
    return burstBase({
      description,
      element: Element.Pyro,
      multiplier: params[i],
      stats,
      modifier,
    });
  });

  return talentDamage;
}
