import Talent from './Talent';
import {
  attackHeavyMulti,
  skillBase,
  burstDefault,
  burstBase,
} from './TalentUtil';
import { TalentProps, Element } from './types';

const eulaTalent: Talent = {
  attack: eulaAttack,
  skill: eulaSkill,
  burst: eulaBurst,
};

export default eulaTalent;

function eulaAttack({ params, stats, modifier }: TalentProps) {
  return attackHeavyMulti({
    normalHits: [1, 1, 2, 1, 2],
    params,
    stats,
    modifier,
  });
}

function eulaSkill({ params, stats, modifier }: TalentProps) {
  let descriptions = ['pressDmg', 'holdDmg', 'icewhirlBrandDmg'];
  return descriptions.map((description, i) => {
    return skillBase({
      description,
      element: Element.Cryo,
      multiplier: params[i],
      stats,
      modifier,
    });
  });
}

function eulaBurst({ params, stats, modifier }: TalentProps) {
  let talentDmg = [];
  talentDmg.push(
    ...burstDefault({
      element: Element.Cryo,
      params,
      stats,
      modifier,
    })
  );

  let descriptions = ['lightfallSwordBaseDmg', 'lightfallSwordStackDmg'];
  let lightfallSwordParams = params.slice(1, 3);
  let lightfallSwordTalent = descriptions.map((description, i) => {
    return burstBase({
      description,
      element: Element.Physical,
      multiplier: lightfallSwordParams[i],
      stats,
      modifier,
    });
  });

  talentDmg.push(...lightfallSwordTalent);

  return talentDmg;
}
