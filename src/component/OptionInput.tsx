import React from 'react';
import Option, {
  isBooleanOption,
  isPickerOption,
  isNumberOption,
} from '../js/option';
import {
  IOptionBoolean,
  IOptionNumber,
  IOptionPicker,
} from '../js/option/Option';
import { capitalize, getOptionName } from '../js/Stat';
import Checkbox from './Checkbox';
import IntInput from './IntInput';
import Picker from './Picker';

type OptionInputProps = {
  option: Option;
  updateOptions: () => void;
};

class OptionInput extends React.Component<OptionInputProps> {
  handleBooleanChange = (option: IOptionBoolean) => (value: boolean) => {
    option.value = value;
    this.props.updateOptions();
  };

  handlePickerChange = (option: IOptionPicker) => (value: string) => {
    option.value = value;
    this.props.updateOptions();
  };

  handleNumberChange = (option: IOptionNumber) => (value: number) => {
    option.value = value;
    this.props.updateOptions();
  };

  render() {
    const { option } = this.props;

    if (isBooleanOption(option)) {
      return (
        <Checkbox
          id={`${option.id}-input`}
          label={getOptionName(option.id)}
          defaultValue={option.value}
          value={option.value}
          onChange={this.handleBooleanChange(option)}
        />
      );
    } else if (isPickerOption(option)) {
      return (
        <Picker
          id={`${option.id}-input`}
          label={getOptionName(option.id)}
          defaultValue={option.value}
          value={option.value}
          onChange={this.handlePickerChange(option)}
        >
          <Picker.Item label='' value='' />
          {option.choices.map((choice) => (
            <Picker.Item
              label={capitalize(choice)}
              value={choice}
              key={choice}
            />
          ))}
        </Picker>
      );
    } else if (isNumberOption(option)) {
      return (
        <IntInput
          id={`${option.id}-input`}
          label={getOptionName(option.id)}
          defaultValue={option.value}
          value={option.value}
          onInput={this.handleNumberChange(option)}
          className='level-input'
        />
      );
    }
  }
}

export default OptionInput;
