import React from 'react';
import './App.css';
import InputColumn from './component/InputColumn';
import StatColumn from './component/StatColumn';
import Character from './js/Character';

export type AppState = {
  character: Character;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    character: new Character('', 1, false),
  };

  setAppState = <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => {
    this.setState(state, callback);
  };

  render() {
    return (
      <div className='container'>
        <InputColumn appState={this.state} setAppState={this.setAppState} />
        <StatColumn appState={this.state} />
      </div>
    );
  }
}

export default App;
