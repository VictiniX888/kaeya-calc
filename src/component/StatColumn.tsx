import React from 'react';
import { AppState } from '../App';
import CharacterStatBlock from './CharacterStatBlock';
import Column from './Column';

type StatColumnProps = {
  appState: AppState;
};

class StatColumn extends React.Component<StatColumnProps> {
  render() {
    const { character } = this.props.appState;

    return (
      <Column className='stat-column'>
        <CharacterStatBlock character={character} />
      </Column>
    );
  }
}

export default StatColumn;
