import React from 'react';
import { Stats } from '../data/types';
import { propMapping } from '../data/Data';
import { getStatDisplayValue } from '../stat/Stat';

type TotalStatBlockProps = {
  totalStats: Stats;
};

class TotalStatBlock extends React.Component<TotalStatBlockProps> {
  render() {
    return (
      <div className='result-block'>
        <h2>Total Stats</h2>
        {Object.entries(this.props.totalStats).map(
          ([prop, value]) =>
            // Temporary way to exclude Base Atk from being displayed
            // Potential method is to hardcode the stats that should be displayed
            // (similar to how it is done in getTotalStatsAt)
            prop !== 'baseAtk' && (
              <p key={prop}>
                {propMapping[prop].name}: {getStatDisplayValue(prop, value)}
              </p>
            )
        )}
      </div>
    );
  }
}

export default TotalStatBlock;
