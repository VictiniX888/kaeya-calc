import React from 'react';
import { AppState } from '../App';
import Artifact from '../js/artifact/Artifact';
import ArtifactBlock from './ArtifactBlock';
import Column from './Column';

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
      <Column className='input-column'>
        <h2>Artifacts</h2>
        {appState.artifacts.map((artifact) => (
          <ArtifactBlock
            artifact={artifact}
            updateArtifactState={this.updateArtifactState}
            key={artifact.type}
          />
        ))}
      </Column>
    );
  }
}

export default ArtifactColumn;
