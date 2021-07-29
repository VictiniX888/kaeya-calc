import React from 'react';
import { Stats } from '../data/types';
import { propMapping } from '../js/Data';
import { getStatDisplayValue } from '../js/Stat';

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
        {Object.entries(artifactSetBonuses).map(([prop, value]) => (
          <p key={prop}>
            {propMapping[prop].name}:{' '}
            {getStatDisplayValue(value, propMapping[prop].isPercentage)}
          </p>
        ))}
      </div>
    );
  }
}

export default ArtifactSetStatBlock;
