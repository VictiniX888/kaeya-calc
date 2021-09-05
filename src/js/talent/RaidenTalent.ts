import { Stats } from '../../data/types';
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
  let newStats: Stats = { ...stats };
  const resolveBonus = params[1] + params[2] * (modifier.resolveStacks ?? 0);
  newStats.dmgBonus = resolveBonus + (newStats.dmgBonus ?? 0);

  let talentValues: TalentValue[] = [];

  // Musou no Hitotachi
  talentValues.push(
    burstBase({
      description: 'musouNoHitotachiDmg',
      element: Element.Electro,
      multiplier: params[0],
      stats: newStats,
      modifier,
    })
  );

  /* Musou Isshin: assuming attacks are not considered normal, charged or plunge DMG */
  // 1-3 hit
  for (let i = 0; i < 3; i++) {
    talentValues.push(
      burstBase({
        description: `${i + 1}HitDmg`,
        element: Element.Electro,
        multiplier: params[i + 4],
        stats: newStats,
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
      params: params.slice(7, 9),
      stats: newStats,
      modifier,
    })
  );

  // 5 hit
  talentValues.push(
    burstBase({
      description: '5HitDmg',
      element: Element.Electro,
      multiplier: params[9],
      stats: newStats,
      modifier,
    })
  );

  // Charged attack
  talentValues.push(
    burstMultiBase({
      description: 'chargedDmg',
      hits: 2,
      element: Element.Electro,
      params: params.slice(10, 12),
      stats: newStats,
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
        multiplier: params[13 + i],
        stats: newStats,
        modifier,
      })
    );
  });

  return talentValues;
}
