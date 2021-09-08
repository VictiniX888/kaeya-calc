import Talent from './Talent';
import {
  attackLightMulti,
  burstBase,
  burstMultiBase,
  skillBase,
} from './TalentUtil';
import { Element, TalentProps, TalentValue } from './types';

const raidenTalent: Talent = {
  attack: raidenAttack,
  skill: raidenSkill,
  burst: raidenBurst,
};

export default raidenTalent;

function raidenAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 2, 1],
    params: params.slice(0, 4).concat(params.slice(5)),
    stats,
    modifier,
  });
}

function raidenSkill({ params, stats, modifier }: TalentProps) {
  return [
    skillBase({
      description: 'skillDmg',
      element: Element.Electro,
      multiplier: params[0],
      stats,
      modifier,
    }),

    skillBase({
      description: 'coordinatedAtkDmg',
      element: Element.Electro,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}

function raidenBurst({ params, stats, modifier }: TalentProps) {
  let talentValues: TalentValue[] = [];

  // Musou no Hitotachi
  const initialResolveBonus = params[1] * (modifier.resolveStacks ?? 0);
  talentValues.push(
    burstBase({
      description: 'musouNoHitotachiDmg',
      element: Element.Electro,
      multiplier: params[0] + initialResolveBonus,
      stats,
      modifier,
    })
  );

  /* Musou Isshin*/
  const attackResolveBonus = params[2] * (modifier.resolveStacks ?? 0);
  // 1-3 hit
  for (let i = 0; i < 3; i++) {
    talentValues.push(
      burstBase({
        description: `${i + 1}HitDmg`,
        element: Element.Electro,
        multiplier: params[i + 4] + attackResolveBonus,
        stats,
        modifier,
      })
    );
  }

  // 4 hit
  talentValues.push(
    burstMultiBase({
      description: '4HitDmg',
      hits: 2,
      element: Element.Electro,
      params: params.slice(7, 9).map((param) => param + attackResolveBonus),
      stats,
      modifier,
    })
  );

  // 5 hit
  talentValues.push(
    burstBase({
      description: '5HitDmg',
      element: Element.Electro,
      multiplier: params[9] + attackResolveBonus,
      stats,
      modifier,
    })
  );

  // Charged attack
  talentValues.push(
    burstMultiBase({
      description: 'chargedDmg',
      hits: 2,
      element: Element.Electro,
      params: params.slice(10, 12).map((param) => param + attackResolveBonus),
      stats,
      modifier,
    })
  );

  // Plunge
  let plungeDescriptions = ['plungeDmg', 'lowPlungeDmg', 'highPlungeDmg'];
  plungeDescriptions.forEach((description, i) => {
    talentValues.push(
      burstBase({
        description,
        element: Element.Electro,
        multiplier: params[13 + i] + attackResolveBonus,
        stats,
        modifier,
      })
    );
  });

  return talentValues;
}
