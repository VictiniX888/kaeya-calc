import Talent from './Talent';
import {
  burstBase,
  calculateTotalDamage,
  chargedAttackHeavy,
  healingSkillBase,
  plungeAttackDefault,
  skillBase,
} from './TalentUtil';
import {
  AttackType,
  Element,
  ScalingType,
  TalentProps,
  TalentValue,
} from './types';

const sayuTalent: Talent = {
  attack: sayuAttack,
  skill: sayuSkill,
  burst: sayuBurst,
};

export default sayuTalent;

function sayuAttack({ params, stats, modifier }: TalentProps) {
  let talentValues: TalentValue[] = [];

  // Normal attack
  for (let i = 0; i < 2; i++) {
    let damage = calculateTotalDamage({
      stats,
      multiplier: params[i],
      element: Element.Physical,
      attackType: AttackType.Normal,
      modifier,
    });
    talentValues.push({
      description: `${i + 1}HitDmg`,
      damage: [damage],
    });
  }

  let hit3Dmg = [];
  for (let i = 2; i < 4; i++) {
    hit3Dmg.push(
      calculateTotalDamage({
        stats,
        multiplier: params[i],
        element: Element.Physical,
        attackType: AttackType.Normal,
        modifier,
      })
    );
  }
  talentValues.push({
    description: '3HitDmg',
    damage: hit3Dmg,
  });

  let hit4Dmg = [
    calculateTotalDamage({
      stats,
      multiplier: params[4],
      element: Element.Physical,
      attackType: AttackType.Normal,
      modifier,
    }),
  ];
  talentValues.push({
    description: `4HitDmg`,
    damage: hit4Dmg,
  });

  // Charged attack
  talentValues.push(
    ...chargedAttackHeavy({ params: params.slice(5, 7), stats, modifier })
  );

  // Plunge attack
  talentValues.push(
    ...plungeAttackDefault({
      element: Element.Physical,
      params: params.slice(9, 12),
      stats,
      modifier,
    })
  );

  return talentValues;
}

function sayuSkill({ params, stats, modifier }: TalentProps) {
  const talentValues: TalentValue[] = [];

  const skillDescriptions = [
    'fuufuuWindwheelDmg',
    'fuufuuWhirlwindKickPressDmg',
    'fuufuuWhirlwindKickHoldDmg',
  ];
  const skillParams = [params[0], params[2], params[3]];

  skillDescriptions.forEach((description, i) =>
    talentValues.push(
      skillBase({
        description,
        element: Element.Anemo,
        multiplier: skillParams[i],
        stats,
        modifier,
      })
    )
  );

  if (modifier.elementalAbsorption !== undefined) {
    const elementalAbsorption = modifier.elementalAbsorption;
    const elementalDescriptions = [
      'fuufuuWindwheelElementalDmg',
      'fuufuuWhirlwindKickElementalDmg',
    ];
    const elementalParams = [params[1], params[4]];

    elementalDescriptions.forEach((description, i) =>
      talentValues.push(
        skillBase({
          description,
          element: elementalAbsorption,
          multiplier: elementalParams[i],
          stats,
          modifier,
        })
      )
    );
  }

  return talentValues;
}

function sayuBurst({ params, stats, modifier }: TalentProps) {
  return [
    burstBase({
      description: 'activationDmg',
      element: Element.Anemo,
      multiplier: params[0],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'activationHealing',
      scalingType: ScalingType.Attack,
      params: [params[2], params[1]],
      stats,
      modifier,
    }),

    burstBase({
      description: 'mujimujiDarumaDmg',
      element: Element.Anemo,
      multiplier: params[3],
      stats,
      modifier,
    }),

    healingSkillBase({
      description: 'mujimujiDarumaHealing',
      scalingType: ScalingType.Attack,
      params: [params[5], params[4]],
      stats,
      modifier,
    }),
  ];
}
