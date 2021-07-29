import React from 'react';
import { AppState } from '../App';
import { Stats } from '../data/types';
import ArtifactSetStatBlock from './ArtifactSetStatBlock';
import CharacterStatBlock from './CharacterStatBlock';
import Column from './Column';
import TotalStatBlock from './TotalStatBlock';
import WeaponStatBlock from './WeaponStatBlock';

type StatColumnProps = {
  appState: AppState;
  totalStats: Stats;
  artifactSetBonuses: Stats;
};

class StatColumn extends React.Component<StatColumnProps> {
  render() {
    const { character, weapon } = this.props.appState;

    return (
      <Column className='stat-column'>
        <TotalStatBlock totalStats={this.props.totalStats} />
        <CharacterStatBlock character={character} />
        <WeaponStatBlock weapon={weapon} />
        <ArtifactSetStatBlock
          artifactSetBonuses={this.props.artifactSetBonuses}
        />
      </Column>
    );
  }
}

export default StatColumn;
