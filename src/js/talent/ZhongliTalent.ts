import Talent from './Talent';
import {
  attackLightMulti,
  skillBase,
  shieldBase,
  burstDefault,
} from './TalentUtil';
import { TalentProps, Element } from './types';

const zhongliTalent: Talent = {
  attack: zhongliAttack,
  skill: zhongliSkill,
  burst: zhongliBurst,
};

export default zhongliTalent;

function zhongliAttack({ params, stats, modifier }: TalentProps) {
  return attackLightMulti({
    normalHits: [1, 1, 1, 1, 4, 1],
    params,
    stats,
    modifier,
  });
}

function zhongliSkill({ params, stats, modifier }: TalentProps) {
  let descriptions = ['stoneSteeleDmg', 'resonanceDmg'];

  let talentDamage = descriptions.map((description, i) => {
    return skillBase({
      description,
      element: Element.Geo,
      multiplier: params[i],
      stats,
      modifier,
    });
  });

  talentDamage.push(
    skillBase({
      description: 'holdDmg',
      element: Element.Geo,
      multiplier: params[3],
      stats,
      modifier,
    })
  );

  talentDamage.push(
    shieldBase({
      description: 'shieldHp',
      multiplier: params[5],
      flatBonus: params[4],
      element: Element.Geo,
      stats,
      modifier,
    })
  );

  return talentDamage;
}

function zhongliBurst({ params, stats, modifier }: TalentProps) {
  return burstDefault({
    element: Element.Geo,
    params,
    stats,
    modifier,
  });
}
