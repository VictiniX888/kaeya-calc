import Talent from './Talent';
import { attackBowDefault, skillBase, hpBase, burstBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const amberTalent: Talent = {
  attack: amberAttack,
  skill: amberSkill,
  burst: amberBurst,
};

export default amberTalent;

function amberAttack({ params, stats, modifier }: TalentProps) {
  return attackBowDefault({
    normalHits: 5,
    chargedElement: Element.Pyro,
    params,
    stats,
    modifier,
  });
}

function amberSkill({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  talentDamage.push(
    skillBase({
      description: 'explosionDmg',
      element: Element.Electro,
      multiplier: params[1],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    hpBase({
      description: 'baronBunnyHp',
      multiplier: params[0],
      flatBonus: 0,
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function amberBurst({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  talentDamage.push(
    burstBase({
      description: 'dmgPerWave',
      element: Element.Pyro,
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  talentDamage.push({
    description: 'totalDmg',
    damage: [talentDamage[0].damage[0] * 18],
  });

  return talentDamage;
}
