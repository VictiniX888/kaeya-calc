import React from 'react';
import Artifact, { mainStatProps, subStatProps } from '../artifact/Artifact';
import { propMapping } from '../data/Data';
import { capitalize, getStatDisplayValue } from '../stat/Stat';
import FloatInput from './FloatInput';
import InputRow from './InputRow';
import IntInput from './IntInput';
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

  setArtifactRarity = (rarity: number) => {
    this.props.artifact.rarity = rarity;
    this.props.updateArtifactState();
  };

  setArtifactLevel = (level: number) => {
    this.props.artifact.level = level;
    this.props.updateArtifactState();
  };

  setArtifactSubStatProp = (i: number) => (prop: string) => {
    this.props.artifact.setSubStatProp(i, prop);
    this.props.updateArtifactState();
  };

  setArtifactSubStatValue = (i: number) => (value: number) => {
    this.props.artifact.setSubStatInputValue(i, value);
    this.props.updateArtifactState();
  };

  render() {
    const { artifact } = this.props;

    return (
      <div className='sub-block'>
        <h3>{capitalize(artifact.type)}</h3>

        <InputRow>
          <IntInput
            className='level-input'
            id={`artifact-${artifact.type}-rarity`}
            label='Rarity:'
            defaultValue={1}
            value={artifact.rarity}
            onInput={this.setArtifactRarity}
          />
        </InputRow>

        <InputRow>
          <IntInput
            className='level-input'
            id={`artifact-${artifact.type}-level`}
            label='Level:'
            defaultValue={0}
            value={artifact.level}
            onInput={this.setArtifactLevel}
          />
        </InputRow>

        <InputRow>
          <Picker
            id={`artifact-${artifact.type}-main-stat`}
            label='Main Stat:'
            defaultValue=''
            value={artifact.mainStat.stat}
            onChange={this.setArtifactMainStatProp}
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

          <p>
            {getStatDisplayValue(
              artifact.mainStat.stat,
              artifact.mainStat.value
            )}
          </p>
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
