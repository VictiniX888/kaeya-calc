import Talent from './Talent';
import {
  calculateTotalDamage,
  chargedAttackDefault,
  plungeAttackDefault,
  skillBase,
  hpBase,
  burstBase,
} from './TalentUtil';
import { TalentProps, AttackType, Element } from './types';

const ningguangTalent: Talent = {
  attack: ningguangAttack,
  skill: ningguangSkill,
  burst: ningguangBurst,
};

export default ningguangTalent;

function ningguangAttack({ params, stats, modifier }: TalentProps) {
  let talentDmg = [];

  // Ningguang's normal attack has no combo
  let normalAtkDmg = calculateTotalDamage({
    stats,
    multiplier: params[0],
    element: Element.Geo,
    attackType: AttackType.Normal,
    modifier,
  });
  talentDmg.push({
    description: 'normalAtkDmg',
    damage: [normalAtkDmg],
  });

  talentDmg.push(
    ...chargedAttackDefault({
      element: Element.Geo,
      params: params.slice(1, 2),
      stats,
      modifier,
    })
  );

  // Ningguang's charged attack dmg per star jade
  let starJadeDmg = calculateTotalDamage({
    stats,
    multiplier: params[2],
    element: Element.Geo,
    attackType: AttackType.Charged,
    modifier,
  });
  talentDmg.push({
    description: 'starJadeDmg',
    damage: [starJadeDmg],
  });

  talentDmg.push(
    ...plungeAttackDefault({
      element: Element.Geo,
      params: params.slice(4),
      stats,
      modifier,
    })
  );

  return talentDmg;
}

function ningguangSkill({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  talentDamage.push(
    skillBase({
      description: 'skillDmg',
      element: Element.Geo,
      multiplier: params[1],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    hpBase({
      description: 'jadeScreenHp',
      multiplier: params[2],
      flatBonus: 0,
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function ningguangBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'dmgPerGem',
      element: Element.Geo,
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}
