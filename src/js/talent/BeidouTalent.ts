import Talent from './Talent';
import {
  attackHeavyDefault,
  shieldBase,
  skillBase,
  burstBase,
} from './TalentUtil';
import { TalentProps, Element } from './types';

const beidouTalent: Talent = {
  attack: beidouAttack,
  skill: beidouSkill,
  burst: beidouBurst,
};

export default beidouTalent;

function beidouAttack({ params, stats, modifier }: TalentProps) {
  return attackHeavyDefault({
    normalHits: 5,
    params,
    stats,
    modifier,
  });
}

function beidouSkill({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  talentDamage.push(
    shieldBase({
      description: 'shieldHp',
      multiplier: params[0],
      flatBonus: params[1],
      element: Element.Electro,
      stats,
      modifier,
    })
  );

  talentDamage.push(
    skillBase({
      description: 'baseDmg',
      element: Element.Electro,
      multiplier: params[2],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    skillBase({
      description: 'dmgBonusOnHitTaken',
      element: Element.Electro,
      multiplier: params[3],
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function beidouBurst({ params, stats, modifier }: TalentProps) {
  let talentDamage = [];

  talentDamage.push(
    burstBase({
      description: 'skillDmg',
      element: Element.Electro,
      multiplier: params[0],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    burstBase({
      description: 'lightningDmg',
      element: Element.Electro,
      multiplier: params[1],
      stats,
      modifier,
    })
  );

  return talentDamage;
}
