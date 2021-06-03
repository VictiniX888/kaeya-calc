import React from 'react';
import './App.css';
import InputColumn from './component/InputColumn';

export type AppState = {
  characterId: string;
  characterLevel: number;
  isCharacterAscended: boolean;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    characterId: '',
    characterLevel: 1,
    isCharacterAscended: false,
  };

  setAppState = <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => {
    this.setState(state, callback);
  };

  render() {
    return (
      <div className='App'>
        <InputColumn appState={this.state} setAppState={this.setAppState} />
      </div>
    );
  }
}

export default App;
