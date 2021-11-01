import React from 'react';
import Option, {
  isBooleanOption,
  isPickerOption,
  isNumberOption,
} from '../option';
import { IOptionBoolean, IOptionNumber, IOptionPicker } from '../option/Option';
import { capitalize, getOptionName } from '../stat/Stat';
import Checkbox from './Checkbox';
import IntInput from './IntInput';
import Picker from './Picker';

type OptionInputProps = {
  option: Option;
  updateOptions: () => void;
  isLabelShown?: boolean;
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
          isLabelShown={this.props.isLabelShown}
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
          isLabelShown={this.props.isLabelShown}
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
          isLabelShown={this.props.isLabelShown}
          className='level-input'
        />
      );
    }
  }
}

export default OptionInput;
