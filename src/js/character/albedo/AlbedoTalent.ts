import { getTalentData } from '../../Data';
import {
  normalAttackSingle,
  chargedAttackMulti,
  plungeAttack,
} from '../../talent/TalentUtil';
import { TalentProps, TalentFn, Talents } from '../../talent/types';

const { attack: attackParams } = getTalentData('albedo');

const albedoTalents: Talents = {
  attack: {
    ...albedoNormalAttack(),

    chargedDmg: ({ stats, modifier }: TalentProps) =>
      chargedAttackMulti({
        hits: 2,
        params: attackParams[modifier.talentAttackLevel].slice(5, 7),
        stats,
        modifier,
      }),

    ...albedoPlungeAttack(),
  },
};

export default albedoTalents;

function albedoNormalAttack(): Record<string, TalentFn> {
  const talentValues: Record<string, TalentFn> = {};
  for (let i = 0; i < 5; i++) {
    talentValues[`${i + 1}HitDmg`] = ({ stats, modifier }: TalentProps) =>
      normalAttackSingle({
        multiplier: attackParams[modifier.talentAttackLevel][i],
        stats,
        modifier,
      });
  }

  return talentValues;
}

function albedoPlungeAttack(): Record<string, TalentFn> {
  const talentValues: Record<string, TalentFn> = {};

  const talentIds = ['plungeDmg', 'lowPlungeDmg', 'highPlungeDmg'];
  talentIds.forEach(
    (id, i) =>
      (talentValues[id] = ({ stats, modifier }: TalentProps) =>
        plungeAttack({
          multiplier: attackParams[modifier.talentAttackLevel][i + 8],
          stats,
          modifier,
        }))
  );

  return talentValues;
}

/*
function albedoAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 1, 1],
    chargedHits: 2,
    params,
    stats,
    modifier,
  });
}

function albedoSkill({ params, stats, modifier }: TalentProps) {
  let talentDmg = [];

  talentDmg.push(
    skillBase({
      description: 'skillDmg',
      element: Element.Geo,
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  let transientBlossomDmg = calculateTotalDamage({
    stats,
    multiplier: params[1],
    element: Element.Geo,
    scalingType: ScalingType.Defense,
    attackType: AttackType.Skill,
    modifier,
  });
  talentDmg.push({
    description: 'transientBlossomDmg',
    damage: [transientBlossomDmg],
  });

  return talentDmg;
}

function albedoBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'burstDmg',
      element: Element.Geo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'fatalBlossomDmg',
      element: Element.Geo,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}
*/
