import Talent from './Talent';
import { attackLightDefault, skillBase, burstDefault } from './TalentUtil';
import { TalentProps, Element } from './types';

const lisaTalent: Talent = {
  attack: lisaAttack,
  skill: lisaSkill,
  burst: lisaBurst,
};

export default lisaTalent;

function lisaAttack({ params, stats, modifier }: TalentProps) {
  return attackLightDefault({
    normalHits: 4,
    element: Element.Electro,
    params,
    stats,
    modifier,
  });
}

function lisaSkill({ params, stats, modifier }: TalentProps) {
  let talentDmg = [];

  talentDmg.push(
    skillBase({
      description: 'pressDmg',
      element: Element.Electro,
      multiplier: params[5],
      stats,
      modifier,
    })
  );

  for (let i = 0; i <= 3; i++) {
    talentDmg.push(
      skillBase({
        description: `holdDmgStack${i}`,
        element: Element.Electro,
        multiplier: params[i],
        stats,
        modifier,
      })
    );
  }

  return talentDmg;
}

function lisaBurst({ params, stats, modifier }: TalentProps) {
  return burstDefault({
    element: Element.Electro,
    params,
    stats,
    modifier,
  });
}
