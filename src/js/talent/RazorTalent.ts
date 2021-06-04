import { getTalentStatsAt, getTalentData } from '../Data';
import Talent from './Talent';
import {
  attackHeavyDefault,
  skillBase,
  burstDefault,
  burstBase,
} from './TalentUtil';
import { TalentProps, TalentType, Element } from './types';

const razorTalent: Talent = {
  attack: razorAttack,
  skill: razorSkill,
  burst: razorBurst,
};

export default razorTalent;

function razorAttack({ params, stats, modifier }: TalentProps) {
  return attackHeavyDefault({
    normalHits: 4,
    params,
    stats,
    modifier,
  });
}

function razorSkill({ params, stats, modifier }: TalentProps) {
  let descriptions = ['pressDmg', 'holdDmg'];
  return descriptions.map((description, i) => {
    return skillBase({
      description,
      element: Element.Electro,
      multiplier: params[i],
      stats,
      modifier,
    });
  });
}

function razorBurst({ params, stats, modifier }: TalentProps) {
  let talentDamage = burstDefault({
    element: Element.Electro,
    params,
    stats,
    modifier,
  });

  let attackParams = getTalentStatsAt(
    TalentType.Attack,
    modifier.talentAttackLevel,
    getTalentData('razor')
  );

  for (let i = 0; i < 4; i++) {
    talentDamage.push(
      burstBase({
        description: `${i + 1}HitDmgSoulCompanion`,
        element: Element.Electro,
        multiplier: params[1] * attackParams[i],
        stats,
        modifier,
      })
    );
  }

  return talentDamage;
}
