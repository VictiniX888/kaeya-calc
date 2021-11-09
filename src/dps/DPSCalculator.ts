import {
  AppState,
  GetDamageModifierFn,
  GetModifierMixinsFn,
  GetStatMixinsFn,
} from '../App';
import Artifact from '../artifact/Artifact';
import { getAscensionLevel } from '../character/Character';
import { Stats } from '../data/types';
import { getOptionValue, setOptionValue } from '../option';
import ReactionOption from '../option/characterOptions/ReactionOption';
import Option from '../option/Option';
import { getTotalStatsAt } from '../stat/Stat';
import { TalentValue } from '../talent/types';
import artifactTeamBuffs from '../teambuff/artifact/ArtifactTeamBuff';

export function calculateTalentValue(
  talentType: string,
  talentId: string,
  options: Option[],
  appState: AppState,
  artifactSetBonuses: Stats,
  getDamageModifier: GetDamageModifierFn,
  getStatMixins: GetStatMixinsFn,
  getModifierMixins: GetModifierMixinsFn,
  overrideArtifacts?: Artifact[]
): TalentValue {
  // Initialize a set of all options
  const {
    characterOptions,
    weaponOptions,
    artifactSetOptions,
    teamOptions,
    artifactBuffOptions,
  } = initializeAllOptions(appState);

  const allOptions = [
    ...characterOptions,
    ...weaponOptions,
    ...artifactSetOptions,
    ...teamOptions,
    ...artifactBuffOptions,
  ];

  // Override option values
  options.forEach((option) => {
    let oldOption = allOptions.find((oldOption) => oldOption.id === option.id);
    if (oldOption !== undefined) {
      setOptionValue(oldOption, getOptionValue(option));
    } else if (option.id === 'reaction') {
      characterOptions.push(option as ReactionOption);
    }
  });

  // Calculate stats and modifier
  const statMixins = getStatMixins({
    characterOptions,
    weaponOptions,
    artifactSetOptions,
    teamOptions,
    artifactBuffOptions,
    updateCache: false,
  });

  const stats = getTotalStatsAt(
    appState.character,
    appState.weapon,
    artifactSetBonuses,
    overrideArtifacts ?? appState.artifacts,
    appState.talentAttackLevel,
    appState.talentSkillLevel,
    appState.talentBurstLevel,
    statMixins
  );

  const modifierMixins = getModifierMixins({
    characterOptions,
    weaponOptions,
    artifactSetOptions,
    teamOptions,
    artifactBuffOptions,
    updateCache: false,
  });

  const modifier = getDamageModifier({ modifierMixins });

  // Calculate talent value
  const talentFn = appState.character.talentFns[talentType]?.[talentId];

  const talentValue = talentFn?.({ stats, modifier }) ?? { damage: [NaN] };

  return talentValue;
}

export function initializeAllOptions(appState: AppState) {
  const characterOptions = [
    ...appState.character.getCharacterOptions(),
    ...appState.character.getPassiveOptions(
      getAscensionLevel(
        appState.character.level,
        appState.character.hasAscended
      )
    ),
    ...appState.character.getConstellationsOptions(
      appState.character.constellationLevel
    ),
  ];
  appState.characterOptions.forEach((option) => {
    let characterOption = characterOptions.find(
      (characterOption) => characterOption.id === option.id
    );
    if (characterOption !== undefined) {
      setOptionValue(characterOption, getOptionValue(option));
    }
  });

  const weaponOptions = appState.weapon.getPassiveOptions();
  appState.weaponOptions.forEach((option) => {
    let weaponOption = weaponOptions.find(
      (weaponOption) => weaponOption.id === option.id
    );
    if (weaponOption !== undefined) {
      setOptionValue(weaponOption, getOptionValue(option));
    }
  });

  const artifactSetOptions = appState.artifactSets.flatMap((artifactSet) =>
    artifactSet.getOptions(artifactSet.pieces)
  );
  appState.artifactSetOptions.forEach((option) => {
    let artifactSetOption = artifactSetOptions.find(
      (artifactSetOption) => artifactSetOption.id === option.id
    );
    if (artifactSetOption !== undefined) {
      setOptionValue(artifactSetOption, getOptionValue(option));
    }
  });

  const teamOptions = appState.teamCharacters.flatMap((character) =>
    character.getTeamOptions()
  );
  appState.teamOptions.forEach((option) => {
    let teamOption = teamOptions.find(
      (teamOption) => teamOption.id === option.id
    );
    if (teamOption !== undefined) {
      setOptionValue(teamOption, getOptionValue(option));
    }
  });

  const artifactBuffOptions = appState.artifactBuffOptions.flatMap((option) => {
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
