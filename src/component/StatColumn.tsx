import React from 'react';
import { AppState } from '../App';
import CharacterStatBlock from './CharacterStatBlock';
import Column from './Column';
import WeaponStatBlock from './WeaponStatBlock';

type StatColumnProps = {
  appState: AppState;
};

class StatColumn extends React.Component<StatColumnProps> {
  render() {
    const { character, weapon } = this.props.appState;

    return (
      <Column className='stat-column'>
        <CharacterStatBlock character={character} />
        <WeaponStatBlock weapon={weapon} />
      </Column>
    );
  }
}

export default StatColumn;
