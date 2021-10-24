import React from 'react';
import { AppState } from '../App';
import ArtifactSet from '../artifact/ArtifactSet';
import { ArtifactSetOption } from '../option/artifactSetOptions';
import ArtifactSetPicker from './ArtifactSetPicker';
import InputBlock from './InputBlock';
import InputRow from './InputRow';
import IntInput from './IntInput';
import OptionInput from './OptionInput';

type ArtifactSetInputBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateArtifactSetBonuses: ({
    artifactSets,
    artifactSetOptions,
  }: {
    artifactSets?: ArtifactSet[];
    artifactSetOptions?: ArtifactSetOption[];
  }) => void;
};

class ArtifactSetInputBlock extends React.Component<ArtifactSetInputBlockProps> {
  setArtifactSetId = (i: number) => (id: string) => {
    const { artifactSets } = this.props.appState;
    artifactSets[i].id = id;
    const artifactSetOptions = artifactSets.flatMap(
      (artifactSet) => artifactSet.options
    );
    this.props.updateArtifactSetBonuses({
      artifactSets,
      artifactSetOptions,
    });
    this.props.setAppState({
      artifactSets: [...artifactSets],
      artifactSetOptions,
    });
  };

  setArtifactSetPieces = (i: number) => (pieces: number) => {
    const { artifactSets } = this.props.appState;
    artifactSets[i].pieces = pieces;
    const artifactSetOptions = artifactSets.flatMap(
      (artifactSet) => artifactSet.options
    );
    this.props.updateArtifactSetBonuses({
      artifactSets,
      artifactSetOptions,
    });
    this.props.setAppState({
      artifactSets: [...artifactSets],
      artifactSetOptions,
    });
  };

  updateOptions = () => {
    const { artifactSetOptions } = this.props.appState;
    this.props.updateArtifactSetBonuses({ artifactSetOptions });
    this.props.setAppState({ artifactSetOptions: [...artifactSetOptions] });
  };

  render() {
    const { artifactSets, artifactSetOptions } = this.props.appState;

    return (
      <InputBlock>
        <InputRow>
          <p>Artifact Sets</p>
        </InputRow>
        {[0, 1, 2].map((i) => (
          <InputRow key={i}>
            <ArtifactSetPicker
              index={i}
              artifactSetId={artifactSets[i].id}
              setArtifactSetId={this.setArtifactSetId(i)}
            />

            <p>:</p>

            <IntInput
              id={`artifact-set-${i}-pcs`}
              label=''
              defaultValue={NaN}
              value={artifactSets[i].pieces}
              onInput={this.setArtifactSetPieces(i)}
              isLabelShown={false}
              className='level-input'
            />

            <p>pc</p>
          </InputRow>
        ))}

        {artifactSetOptions.map((option) => (
          <InputRow key={option.id}>
            <OptionInput option={option} updateOptions={this.updateOptions} />
          </InputRow>
        ))}
      </InputBlock>
    );
  }
}

export default ArtifactSetInputBlock;
