import Talent from './Talent';
import {
  attackHeavyDefault,
  skillBase,
  shieldBase,
  burstBase,
} from './TalentUtil';
import { TalentProps, ScalingType, Element } from './types';

const xinyanTalent: Talent = {
  attack: xinyanAttack,
  skill: xinyanSkill,
  burst: xinyanBurst,
};

export default xinyanTalent;

function xinyanAttack({ params, stats, modifier }: TalentProps) {
  return attackHeavyDefault({
    normalHits: 4,
    params,
    stats,
    modifier,
  });
}

function xinyanSkill({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  talentDamage.push(
    skillBase({
      description: 'swingDmg',
      element: Element.Pyro,
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  // Shields
  for (let i = 0; i < 3; i++) {
    talentDamage.push(
      shieldBase({
        description: `shieldHpLevel${i + 1}`,
        multiplier: params[2 * i + 1],
        flatBonus: params[2 * i + 2],
        element: Element.Pyro,
        scalingType: ScalingType.Defense,
        stats,
        modifier,
      })
    );
  }

  talentDamage.push(
    skillBase({
      description: 'dot',
      element: Element.Pyro,
      multiplier: params[7],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function xinyanBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'burstDmg',
      element: Element.Physical,
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'pyroDot',
      element: Element.Pyro,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}
