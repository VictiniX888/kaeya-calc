import React from 'react';
import { AppState } from '../App';
import { Stats } from '../data/types';
import CharacterStatBlock from './CharacterStatBlock';
import Column from './Column';
import TotalStatBlock from './TotalStatBlock';
import WeaponStatBlock from './WeaponStatBlock';

type StatColumnProps = {
  appState: AppState;
  totalStats: Stats;
};

class StatColumn extends React.Component<StatColumnProps> {
  render() {
    const { character, weapon } = this.props.appState;

    return (
      <Column className='stat-column'>
        <TotalStatBlock totalStats={this.props.totalStats} />
        <CharacterStatBlock character={character} />
        <WeaponStatBlock weapon={weapon} />
      </Column>
    );
  }
}

export default StatColumn;
