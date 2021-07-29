import React from 'react';
import Picker from './Picker';

import * as data from '../js/Data';

type ArtifactSetPickerProps = {
  index: number;
  artifactSetId: string;
  setArtifactSetId: (id: string) => void;
};

class ArtifactSetPicker extends React.Component<ArtifactSetPickerProps> {
  onChange = (value: string) => {
    this.props.setArtifactSetId(value);
  };

  render() {
    return (
      <Picker
        id={`artifact-set-${this.props.index}`}
        label=''
        defaultValue=''
        value={this.props.artifactSetId}
        onChange={this.onChange}
        isLabelShown={false}
      >
        <Picker.Item label='' value='' />
        {data.getSortedArtifactSetList().map((artifactSetId) => (
          <Picker.Item
            label={data.getArtifactSetData(artifactSetId).name}
            value={artifactSetId}
            key={artifactSetId}
          />
        ))}
      </Picker>
    );
  }
}

export default ArtifactSetPicker;
