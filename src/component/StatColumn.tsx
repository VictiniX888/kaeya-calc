import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import { AppState } from '../App';
import { Stats } from '../data/types';
import ArtifactSetStatBlock from './ArtifactSetStatBlock';
import CharacterStatBlock from './CharacterStatBlock';
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
      <Col
        id='stat-column'
        className='stat-column no-gutters border-right border-dark'
        md='auto'
        xs={12}
      >
        <TotalStatBlock totalStats={this.props.totalStats} />
        <CharacterStatBlock character={character} />
        <WeaponStatBlock weapon={weapon} />
        <ArtifactSetStatBlock
          artifactSetBonuses={this.props.artifactSetBonuses}
        />
      </Col>
    );
  }
}

export default StatColumn;
