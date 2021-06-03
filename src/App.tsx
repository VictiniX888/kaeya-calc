import React from 'react';
import './App.css';
import InputColumn from './component/InputColumn';

export type AppState = {
  characterId: string;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    characterId: '',
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
