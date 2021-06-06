import React from 'react';
import { AppState } from '../App';
import CharacterPicker from './CharacterPicker';
import Checkbox from './Checkbox';
import Column from './Column';
import NumberInput from './NumberInput';

type InputColumnProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
};

class InputColumn extends React.Component<InputColumnProps> {
  setCharacterId = (id: string) => {
    const character = this.props.appState.character;
    character.id = id;
    this.props.setAppState({ character });
  };

  setCharacterLevel = (level: number) => {
    const character = this.props.appState.character;
    character.level = level;
    this.props.setAppState({ character });
  };

  setIsCharacterAscended = (isAscended: boolean) => {
    const character = this.props.appState.character;
    character.hasAscended = isAscended;
    this.props.setAppState({ character });
  };

  render() {
    const appState = this.props.appState;

    return (
      <Column className='input-column'>
        <CharacterPicker
          characterId={appState.character.id}
          setCharacterId={this.setCharacterId}
        />

        <NumberInput
          id='character-level-input'
          label='Level:'
          defaultValue={1}
          value={appState.character.level}
          onInput={this.setCharacterLevel}
          className='level-input'
        />

        <Checkbox
          id='character-ascension-checkbox'
          label='Ascended?'
          defaultValue={false}
          value={appState.character.hasAscended}
          onChange={this.setIsCharacterAscended}
        />
      </Column>
    );
  }
}

export default InputColumn;
