import React from 'react';
import Option from '../option/Option';
import InputRow from './InputRow';
import Picker from './Picker';
import { optionMapping } from '../data/Data';
import OptionInput from './OptionInput';
import ReactionOption from '../option/characterOptions/ReactionOption';

type DPSOptionInputProps = {
  setOption: (option?: Option) => void;
  options: Option[];
  option?: Option;
  index: number;
};

class DPSOptionInput extends React.Component<DPSOptionInputProps> {
  setOptionId = (id: string) => {
    const OptionConstructor = this.props.options.find(
      (option) => option.id === id
    )?.constructor as { new (): Option };

    if (OptionConstructor !== undefined) {
      this.props.setOption(new OptionConstructor());
    } else if (id === 'reaction') {
      this.props.setOption(new ReactionOption());
    } else {
      this.props.setOption();
    }
  };

  updateOptions = () => {
    this.props.setOption(this.props.option);
  };

  render() {
    return (
      <InputRow className='ml-5'>
        <Picker
          id={`dps-attack-option-${this.props.index}`}
          label=''
          defaultValue=''
          value={this.props.option?.id ?? ''}
          onChange={this.setOptionId}
          isLabelShown={false}
        >
          <Picker.Item value='' label='' />
          <Picker.Item value='reaction' label='Reaction' />
          {this.props.options.map((option) => (
            <Picker.Item
              key={option.id}
              value={option.id}
              label={optionMapping[option.id]}
            />
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

export default DPSOptionInput;
