import React from 'react';
import './App.css';
import ArtifactColumn from './component/ArtifactColumn';
import InputColumn from './component/InputColumn';
import StatColumn from './component/StatColumn';
import Artifact from './js/artifact/Artifact';
import { ArtifactType } from './js/artifact/types';
import Character from './js/Character';
import Weapon from './js/weapon/Weapon';

export type AppState = {
  character: Character;
  weapon: Weapon;
  artifacts: Artifact[];
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    character: new Character('', 1, false),
    weapon: new Weapon('', 1, false),
    artifacts: Object.values(ArtifactType).map((type) => new Artifact(type)),
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
        <ArtifactColumn appState={this.state} setAppState={this.setAppState} />
        <StatColumn appState={this.state} />
      </div>
    );
  }
}

export default App;
