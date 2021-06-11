import React from 'react';
import './App.css';
import ArtifactColumn from './component/ArtifactColumn';
import InputColumn from './component/InputColumn';
import StatColumn from './component/StatColumn';
import { Stats } from './data/types';
import Artifact from './js/artifact/Artifact';
import { ArtifactType } from './js/artifact/types';
import Character from './js/Character';
import { getTotalStatsAt } from './js/Stat';
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

  totalStats: Stats = {};

  setAppState = <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => {
    this.setState(state, callback);
  };

  updateTotalStats = ({
    character,
    weapon,
    artifacts,
  }: {
    character?: Character;
    weapon?: Weapon;
    artifacts?: Artifact[];
  }) => {
    this.totalStats = getTotalStatsAt(
      character ?? this.state.character,
      weapon ?? this.state.weapon,
      {}, // Temp
      artifacts ?? this.state.artifacts,
      [], // Temp
      1, // Temp
      1, // Temp
      1 // Temp
    );
  };

  render() {
    return (
      <div className='container'>
        <InputColumn
          appState={this.state}
          setAppState={this.setAppState}
          updateTotalStats={this.updateTotalStats}
        />
        <ArtifactColumn
          appState={this.state}
          setAppState={this.setAppState}
          updateTotalStats={this.updateTotalStats}
        />
        <StatColumn appState={this.state} totalStats={this.totalStats} />
      </div>
    );
  }
}

export default App;
