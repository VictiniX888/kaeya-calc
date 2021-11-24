import { getArtifactSetBonusParams } from '../data/Data';
import DamageModifier, { getDamageModifier } from '../modifier/DamageModifer';
import Option, { setOptionValue, getOptionValue } from '../option';
import ReactionOption from '../option/characterOptions/ReactionOption';
import { getStatMixins, getModifierMixins } from '../option/Mixin';
import { getTotalStatsAt } from '../stat/Stat';
import { calculateResMultiplier } from '../talent/TalentUtil';
import { Element, TalentValue } from '../talent/types';
import Attack from './Attack';
import {
  CalculateTalentValueParams,
  initializeAllOptions,
} from './DPSCalculator';

export default interface OHCAttack {
  heals: Attack[];
  multiplier: number;
  talentValue: TalentValue;
  options: Option[];
}

export const defaultOHCAttack: OHCAttack = {
  heals: [],
  multiplier: 1,
  talentValue: { damage: [NaN] },
  options: [],
};

// Functions to calculate Ocean-Hued Clam 4pc damage

const ohcParams = getArtifactSetBonusParams('oceanhuedclam', 4);

function ohcTalent({
  totalHeal,
  modifier,
}: {
  totalHeal: number;
  modifier: DamageModifier;
}): TalentValue {
  const enemyResMultiplier = calculateResMultiplier({
    element: Element.Physical,
    res: modifier.enemyRes,
    resReduction: modifier.enemyResReduction,
  });
  if (totalHeal > 30000) totalHeal = 30000;
  const damage = ohcParams[1] * totalHeal * enemyResMultiplier;

  return {
    damage: [damage],
    element: Element.Physical,
  };
}

export function calculateOHCTalentValue({
  options,
  character,
  weapon,
  artifacts,
  artifactSets,
  artifactSetBonuses,
  talentAttackLevel,
  talentSkillLevel,
  talentBurstLevel,
  enemyLevel,
  enemyRes,
  reaction,
  critType,
  teamCharacters,
  characterOptions,
  weaponOptions,
  artifactSetOptions,
  teamOptions,
  artifactBuffOptions,
  swirlOption,
  totalHeal,
}: Omit<CalculateTalentValueParams, 'talentType' | 'talentId' | 'talents'> & {
  totalHeal: number;
}): TalentValue {
  // Initialize a set of all options
  const {
    characterOptions: characterOptionsNew,
    weaponOptions: weaponOptionsNew,
    artifactSetOptions: artifactSetOptionsNew,
    teamOptions: teamOptionsNew,
    artifactBuffOptions: artifactBuffOptionsNew,
    swirlOption: swirlOptionNew,
  } = initializeAllOptions({
    character,
    characterOptions,
    weapon,
    weaponOptions,
    artifactSets,
    artifactSetOptions,
    teamCharacters,
    teamOptions,
    artifactBuffOptions,
    swirlOption,
  });

  const allOptions = [
    ...characterOptionsNew,
    ...weaponOptionsNew,
    ...artifactSetOptionsNew,
    ...teamOptionsNew,
    ...artifactBuffOptionsNew,
    swirlOptionNew,
  ];

  // Override option values
  options.forEach((option) => {
    let newOption = allOptions.find((newOption) => newOption.id === option.id);
    if (newOption !== undefined) {
      setOptionValue(newOption, getOptionValue(option));
    } else if (option.id === 'reaction') {
      characterOptionsNew.push(option as ReactionOption);
    }
  });

  // Calculate stats and modifier
  const statMixins = getStatMixins({
    character,
    characterOptions: characterOptionsNew,
    weapon,
    weaponOptions: weaponOptionsNew,
    artifactSets,
    artifactSetOptions: artifactSetOptionsNew,
    teamCharacters,
    teamOptions: teamOptionsNew,
    artifactBuffOptions: artifactBuffOptionsNew,
  });

  const stats = getTotalStatsAt(
    character,
    weapon,
    artifactSetBonuses,
    artifacts,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    statMixins
  );

  const modifierMixins = getModifierMixins({
    character,
    characterOptions: characterOptionsNew,
    weapon,
    weaponOptions: weaponOptionsNew,
    artifactSets,
    artifactSetOptions: artifactSetOptionsNew,
    teamCharacters,
    teamOptions: teamOptionsNew,
    artifactBuffOptions: artifactBuffOptionsNew,
    swirlOption: swirlOptionNew,
  });

  const modifier = getDamageModifier({
    characterLevel: character.level,
    enemyLevel,
    enemyRes,
    critType,
    reaction,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    modifierMixins,
    stats,
  });

  // Calculate talent value
  const talentValue = ohcTalent({ totalHeal, modifier });

  return talentValue;
}
