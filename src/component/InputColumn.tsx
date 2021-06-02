import React from 'react';
import { AppState } from '../App';
import CharacterPicker from './CharacterPicker';
import Column from './Column';

type InputColumnProps = {
  appState: AppState;
  setAppState: (key: keyof AppState, value: any) => void;
};

class InputColumn extends React.Component<InputColumnProps> {
  setCharacterId = (id: string) => {
    this.props.setAppState('characterId', id);
  };

  render() {
    const appState = this.props.appState;

    return (
      <Column>
        <CharacterPicker
          characterId={appState.characterId}
          setCharacterId={this.setCharacterId}
        />
      </Column>
    );
  }
}

export default InputColumn;
