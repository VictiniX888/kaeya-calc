import Talent from './Talent';
import {
  attackBowDefault,
  calculateTotalDamage,
  skillBase,
  normalAttackMulti,
  _chargedAttackMulti,
  burstBase,
} from './TalentUtil';
import { TalentProps, AttackType, Element } from './types';

const tartagliaTalent: Talent = {
  attack: tartagliaAttack,
  skill: tartagliaSkill,
  burst: tartagliaBurst,
};

export default tartagliaTalent;

function tartagliaAttack({ params, stats, modifier }: TalentProps) {
  let talentDamage = attackBowDefault({
    normalHits: 6,
    chargedElement: Element.Hydro,
    params: params.slice(0, 8).concat(params.slice(10)),
    stats,
    modifier,
  });

  let riptideFlashDmg = calculateTotalDamage({
    stats,
    multiplier: params[8],
    element: Element.Hydro,
    attackType: AttackType.Normal,
    modifier,
  });
  talentDamage.push({
    description: 'riptideFlashDmg',
    damage: [riptideFlashDmg],
  });

  let riptideBurstDmg = calculateTotalDamage({
    stats,
    multiplier: params[9],
    element: Element.Hydro,
    attackType: AttackType.Normal,
    modifier,
  });
  talentDamage.push({
    description: 'riptideBurstDmg',
    damage: [riptideBurstDmg],
  });

  return talentDamage;
}

function tartagliaSkill({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  talentDamage.push(
    skillBase({
      description: 'stanceChangeDmg',
      element: Element.Hydro,
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    ...normalAttackMulti({
      hits: [1, 1, 1, 1, 1, 2],
      element: Element.Hydro,
      params: params.slice(1, 8),
      stats,
      modifier,
    })
  );

  talentDamage.push(
    ..._chargedAttackMulti({
      hits: 2,
      element: Element.Hydro,
      params: params.slice(8, 10),
      stats,
      modifier,
    })
  );

  talentDamage.push(
    skillBase({
      description: 'riptideSlashDmg',
      element: Element.Hydro,
      multiplier: params[10],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function tartagliaBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'burstDmgMelee',
      element: Element.Hydro,
      multiplier: params[0],
      stats,
      modifier,
    }),

    burstBase({
      description: 'burstDmgRanged',
      element: Element.Hydro,
      multiplier: params[2],
      stats,
      modifier,
    }),

    burstBase({
      description: 'riptideBlastDmg',
      element: Element.Hydro,
      multiplier: params[1],
      stats,
      modifier,
    }),
  ];
}
