import Talent from './Talent';
import { attackLightMulti, skillBase, burstBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const xianglingTalent: Talent = {
  attack: xianglingAttack,
  skill: xianglingSkill,
  burst: xianglingBurst,
};

export default xianglingTalent;

function xianglingAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 2, 4, 1],
    params,
    stats,
    modifier,
  });
}

function xianglingSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'guobaDmg',
      element: Element.Pyro,
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}

function xianglingBurst({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  for (let i = 0; i < 3; i++) {
    talentDamage.push(
      burstBase({
        description: `swing${i + 1}HitDmg`,
        element: Element.Pyro,
        multiplier: params[i],
        stats,
        modifier,
      })
    );
  }

  talentDamage.push(
    burstBase({
      description: 'pyronadoDmg',
      element: Element.Pyro,
      multiplier: params[3],
      stats,
      modifier,
    })
  );

  return talentDamage;
}
