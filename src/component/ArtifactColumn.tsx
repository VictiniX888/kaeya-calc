import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import { AppState } from '../App';
import Artifact from '../js/artifact/Artifact';
import ArtifactBlock from './ArtifactBlock';

type ArtifactColumnProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({ artifacts }: { artifacts?: Artifact[] }) => void;
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
        className='input-column no-gutters border-right border-dark'
        xl='auto'
      >
        <h2>Artifacts</h2>
        {appState.artifacts.map((artifact) => (
          <ArtifactBlock
            artifact={artifact}
            updateArtifactState={this.updateArtifactState}
            key={artifact.type}
          />
        ))}
      </Col>
    );
  }
}

export default ArtifactColumn;
