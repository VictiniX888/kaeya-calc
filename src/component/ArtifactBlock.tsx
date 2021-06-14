import React from 'react';
import Artifact, { mainStatProps, subStatProps } from '../js/artifact/Artifact';
import { propMapping } from '../js/Data';
import { capitalize } from '../js/Stat';
import FloatInput from './FloatInput';
import InputRow from './InputRow';
import Picker from './Picker';

type ArtifactBlockProps = {
  artifact: Artifact;
  updateArtifactState: () => void;
};

class ArtifactBlock extends React.Component<ArtifactBlockProps> {
  setArtifactMainStatProp = (prop: string) => {
    this.props.artifact.setMainStatProp(prop);
    this.props.updateArtifactState();
  };

  setArtifactMainStatValue = (value: number) => {
    this.props.artifact.setMainStatValue(value);
    this.props.updateArtifactState();
  };

  setArtifactSubStatProp = (i: number) => (prop: string) => {
    this.props.artifact.setSubStatProp(i, prop);
    this.props.updateArtifactState();
  };

  setArtifactSubStatValue = (i: number) => (value: number) => {
    this.props.artifact.setSubStatValue(i, value);
    this.props.updateArtifactState();
  };

  render() {
    const { artifact } = this.props;

    return (
      <div className='sub-block'>
        <h3>{capitalize(artifact.type)}</h3>

        <p>Main Stat</p>
        <InputRow>
          <Picker
            id={`artifact-${artifact.type}-main-stat`}
            label=''
            defaultValue=''
            value={artifact.mainStat.stat}
            onChange={this.setArtifactMainStatProp}
            isLabelShown={false}
          >
            <Picker.Item label='' value='' />
            {mainStatProps[artifact.type].map((prop) => (
              <Picker.Item
                label={propMapping[prop].name}
                value={prop}
                key={prop}
              />
            ))}
          </Picker>

          <p>:</p>

          <FloatInput
            id={`artifact-${artifact.type}-main-stat-value`}
            label=''
            defaultValue={NaN}
            value={artifact.mainStat.rawValue}
            onInput={this.setArtifactMainStatValue}
            isLabelShown={false}
            className='stat-input'
          />
        </InputRow>

        <p>Substats</p>
        {artifact.subStats.map((statObj, i) => (
          <InputRow key={i}>
            <Picker
              id={`artifact-${artifact.type}-sub-stat-${i}`}
              label=''
              defaultValue=''
              value={statObj.stat}
              onChange={this.setArtifactSubStatProp(i)}
              isLabelShown={false}
            >
              <Picker.Item label='' value='' />
              {subStatProps.map((prop) => (
                <Picker.Item
                  label={propMapping[prop].name}
                  value={prop}
                  key={prop}
                />
              ))}
            </Picker>

            <p>:</p>

            <FloatInput
              id={`artifact-${artifact.type}-sub-stat-${i}-value`}
              label=''
              defaultValue={NaN}
              value={statObj.rawValue}
              onInput={this.setArtifactSubStatValue(i)}
              isLabelShown={false}
              className='stat-input'
            />
          </InputRow>
        ))}
      </div>
    );
  }
}

export default ArtifactBlock;
