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
    this.props.setAppState({ characterId: id });
  };

  setCharacterLevel = (level: number) => {
    this.props.setAppState({ characterLevel: level });
  };

  setIsCharacterAscended = (isAscended: boolean) => {
    this.props.setAppState({ isCharacterAscended: isAscended });
  };

  render() {
    const appState = this.props.appState;

    return (
      <Column>
        <CharacterPicker
          characterId={appState.characterId}
          setCharacterId={this.setCharacterId}
        />

        <NumberInput
          label='Level: '
          defaultValue={1}
          value={appState.characterLevel}
          onInput={this.setCharacterLevel}
        />

        <Checkbox
          label='Ascended? '
          defaultValue={false}
          value={appState.isCharacterAscended}
          onChange={this.setIsCharacterAscended}
        />
      </Column>
    );
  }
}

export default InputColumn;
