import Talent from './Talent';
import { attackBowDefault, skillBase, burstBase } from './TalentUtil';
import { TalentProps, Element } from './types';

const fischlTalent: Talent = {
  attack: fischlAttack,
  skill: fischlSkill,
  burst: fischlBurst,
};

export default fischlTalent;

function fischlAttack({ params, stats, modifier }: TalentProps) {
  return attackBowDefault({
    normalHits: 5,
    chargedElement: Element.Electro,
    params,
    stats,
    modifier,
  });
}

function fischlSkill({ params, stats, modifier }: TalentProps) {
  let descriptions = ['ozDmg', 'summoningDmg'];
  return descriptions.map((description, i) =>
    skillBase({
      description,
      element: Element.Electro,
      multiplier: params[i],
      stats,
      modifier,
    })
  );
}

function fischlBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'fallingThunderDmg',
      element: Element.Electro,
      multiplier: params[0],
      stats,
      modifier,
    }),
  ];
}
