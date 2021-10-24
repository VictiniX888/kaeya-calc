import React from 'react';
import { Stats } from '../data/types';
import { propMapping } from '../data/Data';
import { getStatDisplayValue } from '../stat/Stat';

type ArtifactSetStatBlockProps = {
  artifactSetBonuses: Stats;
};

class ArtifactSetStatBlock extends React.Component<ArtifactSetStatBlockProps> {
  render() {
    const { artifactSetBonuses } = this.props;

    if (Object.keys(artifactSetBonuses).length === 0) {
      return null;
    }

    return (
      <div className='result-block'>
        <h2>Artifact Sets</h2>
        {Object.entries(artifactSetBonuses)
          .filter(
            ([prop, _]) =>
              // Temporary(?) way to not display these fake stats
              prop !== 'burstDmgBonusByEnergyRechargeRatio' &&
              prop !== 'burstDmgBonusByEnergyRechargeMax' &&
              prop !== 'severedFateBonus'
          )
          .map(([prop, value]) => (
            <p key={prop}>
              {propMapping[prop].name}: {getStatDisplayValue(prop, value)}
            </p>
          ))}
      </div>
    );
  }
}

export default ArtifactSetStatBlock;
