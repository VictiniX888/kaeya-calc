import React from 'react';
import { AppState } from '../App';
import Character from '../character/Character';
import { initCharacter } from '../character/CharacterUtil';
import CharacterOption from '../option/characterOptions/CharacterOption';
import CharacterPicker from './CharacterPicker';
import Checkbox from './Checkbox';
import InputBlock from './InputBlock';
import InputRow from './InputRow';
import IntInput from './IntInput';
import OptionInput from './OptionInput';

type CharacterInputBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({
    character,
    characterOptions,
  }: {
    character?: Character;
    characterOptions?: CharacterOption[];
  }) => void;
};

class CharacterInputBlock extends React.Component<CharacterInputBlockProps> {
  setCharacterId = (id: string) => {
    const { level, hasAscended, constellationLevel } =
      this.props.appState.character;
    const character = initCharacter(id, level, hasAscended, constellationLevel);
    const characterOptions = character.getOptions();
    this.props.updateTotalStats({ character, characterOptions });
    this.props.setAppState({ character, characterOptions });
  };

  setCharacterLevel = (level: number) => {
    const character = this.props.appState.character;
    character.level = level;
    const characterOptions = character.getOptions();
    this.props.updateTotalStats({ character, characterOptions });
    this.props.setAppState({ character, characterOptions });
  };

  setIsCharacterAscended = (isAscended: boolean) => {
    const character = this.props.appState.character;
    character.hasAscended = isAscended;
    const characterOptions = character.getOptions();
    this.props.updateTotalStats({ character, characterOptions });
    this.props.setAppState({ character, characterOptions });
  };

  setCharacterConstellationLevel = (constellationLevel: number) => {
    const character = this.props.appState.character;
    character.constellationLevel = constellationLevel;
    const characterOptions = character.getOptions();
    this.props.updateTotalStats({ character, characterOptions });
    this.props.setAppState({ character, characterOptions });
  };

  updateOptions = () => {
    const { characterOptions } = this.props.appState;
    this.props.updateTotalStats({ characterOptions });
    this.props.setAppState({ characterOptions: [...characterOptions] });
  };

  render() {
    const { appState } = this.props;

    return (
      <InputBlock>
        <InputRow>
          <CharacterPicker
            characterId={appState.character.id}
            setCharacterId={this.setCharacterId}
          />
        </InputRow>

        <InputRow>
          <IntInput
            id='character-level-input'
            label='Level:'
            defaultValue={1}
            value={appState.character.level}
            onInput={this.setCharacterLevel}
            className='level-input'
          />
        </InputRow>

        <InputRow>
          <Checkbox
            id='character-ascension-checkbox'
            label='Ascended?'
            defaultValue={false}
            value={appState.character.hasAscended}
            onChange={this.setIsCharacterAscended}
          />
        </InputRow>

        <InputRow>
          <IntInput
            id='character-constellation-level-input'
            label='Constellation:'
            defaultValue={0}
            value={appState.character.constellationLevel}
            onInput={this.setCharacterConstellationLevel}
            className='level-input'
          />
        </InputRow>

        {appState.characterOptions.map((option) => {
          return (
            <InputRow key={option.id}>
              <OptionInput option={option} updateOptions={this.updateOptions} />
            </InputRow>
          );
        })}
      </InputBlock>
    );
  }
}

export default CharacterInputBlock;
