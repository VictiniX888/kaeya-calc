import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import { AppState } from '../App';
import Artifact from '../artifact/Artifact';
import { Stats } from '../data/types';
import ArtifactBlock from './ArtifactBlock';
import OptimizerBlock from './OptimizerBlock';

type ArtifactColumnProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({ artifacts }: { artifacts?: Artifact[] }) => void;
  artifactSetBonuses: Stats;
};

class ArtifactColumn extends React.Component<ArtifactColumnProps> {
  updateArtifactState = () => {
    const artifacts = [...this.props.appState.artifacts];
    this.props.updateTotalStats({ artifacts });
    this.props.setAppState({ artifacts });
  };

  render() {
    const appState = this.props.appState;

    return (
      <Col
        id='artifact-column'
        className='artifact-column no-gutters border-right border-dark'
        md='auto'
        xs={12}
      >
        <div className='artifact-heading'>
          <h2>Artifacts</h2>
        </div>
        <OptimizerBlock {...this.props} />
        <div className='result-block'>
          {appState.artifacts.map((artifact) => (
            <ArtifactBlock
              artifact={artifact}
              updateArtifactState={this.updateArtifactState}
              key={artifact.type}
            />
          ))}
        </div>
      </Col>
    );
  }
}

export default ArtifactColumn;
