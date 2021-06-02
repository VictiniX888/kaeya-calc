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

  // Not very type-safe
  setAppState = (key: keyof AppState, value: typeof key) => {
    this.setState({ [key]: value });
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
