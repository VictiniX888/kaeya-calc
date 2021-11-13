import Artifact from '../artifact/Artifact';
import ArtifactSet from '../artifact/ArtifactSet';
import Character, { getAscensionLevel } from '../character/Character';
import { Stats } from '../data/types';
import CritType from '../modifier/CritType';
import { getDamageModifier } from '../modifier/DamageModifer';
import Reaction from '../modifier/Reaction';
import { getOptionValue, setOptionValue } from '../option';
import ArtifactSetOption from '../option/artifactSetOptions/ArtifactSetOption';
import CharacterOption from '../option/characterOptions/CharacterOption';
import ReactionOption from '../option/characterOptions/ReactionOption';
import { getModifierMixins, getStatMixins } from '../option/Mixin';
import Option from '../option/Option';
import WeaponOption from '../option/weaponOptions/WeaponOption';
import Resistance from '../stat/Resistance';
import { getTotalStatsAt } from '../stat/Stat';
import { TalentValue } from '../talent/types';
import artifactTeamBuffs from '../teambuff/artifact/ArtifactTeamBuff';
import Weapon from '../weapon/Weapon';

export type CalculateTalentValueParams = {
  talentType: string;
  talentId: string;
  options: Option[];
  character: Character;
  weapon: Weapon;
  artifacts: Artifact[];
  artifactSets: ArtifactSet[];
  artifactSetBonuses: Stats;
  talentAttackLevel: number;
  talentSkillLevel: number;
  talentBurstLevel: number;
  enemyLevel: number;
  enemyRes: Resistance;
  reaction: Reaction;
  critType: CritType;
  teamCharacters: Character[];
  characterOptions: CharacterOption[];
  weaponOptions: WeaponOption[];
  artifactSetOptions: ArtifactSetOption[];
  teamOptions: CharacterOption[];
  artifactBuffOptions: ArtifactSetOption[];
};

export function calculateTalentValue({
  talentType,
  talentId,
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
}: CalculateTalentValueParams): TalentValue {
  // Initialize a set of all options
  const {
    characterOptions: characterOptionsNew,
    weaponOptions: weaponOptionsNew,
    artifactSetOptions: artifactSetOptionsNew,
    teamOptions: teamOptionsNew,
    artifactBuffOptions: artifactBuffOptionsNew,
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
  });

  const allOptions = [
    ...characterOptionsNew,
    ...weaponOptionsNew,
    ...artifactSetOptionsNew,
    ...teamOptionsNew,
    ...artifactBuffOptionsNew,
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
  const talentFn = character.talentFns[talentType]?.[talentId];

  const talentValue = talentFn?.({ stats, modifier }) ?? { damage: [NaN] };

  return talentValue;
}

type InitializeAllOptionsParams = {
  character: Character;
  characterOptions: CharacterOption[];
  weapon: Weapon;
  weaponOptions: WeaponOption[];
  artifactSets: ArtifactSet[];
  artifactSetOptions: ArtifactSetOption[];
  teamCharacters: Character[];
  teamOptions: CharacterOption[];
  artifactBuffOptions: ArtifactSetOption[];
};

export function initializeAllOptions(params: InitializeAllOptionsParams) {
  const characterOptions = [
    ...params.character.getCharacterOptions(),
    ...params.character.getPassiveOptions(
      getAscensionLevel(params.character.level, params.character.hasAscended)
    ),
    ...params.character.getConstellationsOptions(
      params.character.constellationLevel
    ),
  ];
  params.characterOptions.forEach((option) => {
    let characterOption = characterOptions.find(
      (characterOption) => characterOption.id === option.id
    );
    if (characterOption !== undefined) {
      setOptionValue(characterOption, getOptionValue(option));
    }
  });

  const weaponOptions = params.weapon.getPassiveOptions();
  params.weaponOptions.forEach((option) => {
    let weaponOption = weaponOptions.find(
      (weaponOption) => weaponOption.id === option.id
    );
    if (weaponOption !== undefined) {
      setOptionValue(weaponOption, getOptionValue(option));
    }
  });

  const artifactSetOptions = params.artifactSets.flatMap((artifactSet) =>
    artifactSet.getOptions(artifactSet.pieces)
  );
  params.artifactSetOptions.forEach((option) => {
    let artifactSetOption = artifactSetOptions.find(
      (artifactSetOption) => artifactSetOption.id === option.id
    );
    if (artifactSetOption !== undefined) {
      setOptionValue(artifactSetOption, getOptionValue(option));
    }
  });

  const teamOptions = params.teamCharacters.flatMap((character) =>
    character.getTeamOptions()
  );
  params.teamOptions.forEach((option) => {
    let teamOption = teamOptions.find(
      (teamOption) => teamOption.id === option.id
    );
    if (teamOption !== undefined) {
      setOptionValue(teamOption, getOptionValue(option));
    }
  });

  const artifactBuffOptions = params.artifactBuffOptions.flatMap((option) => {
    const OptionConstructor = artifactTeamBuffs[option.id];
    if (OptionConstructor !== undefined) {
      let artifactOption = new OptionConstructor();
      setOptionValue(artifactOption, getOptionValue(option));
      return [artifactOption];
    }

    return [];
  });

  return {
    characterOptions,
    weaponOptions,
    artifactSetOptions,
    teamOptions,
    artifactBuffOptions,
  };
}
