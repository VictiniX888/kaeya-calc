import React from 'react';
import Option, { isBooleanOption } from '../js/option';
import { IOptionBoolean } from '../js/option/Option';
import { getOptionName } from '../js/Stat';
import Checkbox from './Checkbox';

type OptionInputProps = {
  option: Option;
  updateOptions: () => void;
};

class OptionInput extends React.Component<OptionInputProps> {
  handleBooleanChange = (option: IOptionBoolean) => (value: boolean) => {
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
    }
  }
}

export default OptionInput;
