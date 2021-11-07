import React from 'react';
import InputRow from './InputRow';
import Picker from './Picker';
import { optionMapping } from '../data/Data';
import OptionInput from './OptionInput';
import ArtifactSetOption from '../option/artifactSetOptions/ArtifactSetOption';

type TeamBuffOptionInputProps = {
  setOption: (option?: ArtifactSetOption) => void;
  options: Record<string, typeof ArtifactSetOption>;
  option?: ArtifactSetOption;
  index: number;
};

class TeamBuffOptionInput extends React.Component<TeamBuffOptionInputProps> {
  setOptionId = (id: string) => {
    const OptionConstructor = this.props.options[id];

    if (OptionConstructor !== undefined) {
      this.props.setOption(new OptionConstructor());
    } else {
      this.props.setOption();
    }
  };

  updateOptions = () => {
    this.props.setOption(this.props.option);
  };

  render() {
    return (
      <InputRow>
        <Picker
          id={`team-buff-option-${this.props.index}`}
          label=''
          defaultValue=''
          value={this.props.option?.id ?? ''}
          onChange={this.setOptionId}
          isLabelShown={false}
        >
          <Picker.Item value='' label='' />
          {Object.keys(this.props.options).map((id) => (
            <Picker.Item key={id} value={id} label={optionMapping[id]} />
          ))}
        </Picker>

        {this.props.option && (
          <OptionInput
            option={this.props.option}
            updateOptions={this.updateOptions}
            isLabelShown={false}
          />
        )}
      </InputRow>
    );
  }
}

export default TeamBuffOptionInput;
