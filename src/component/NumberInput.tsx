import React from 'react';

type NumberInputProps = {
  id: string;
  label: string;
  defaultValue: number;
  value?: number;
  onInput?: (value: number) => void;
  className?: string;
};

type NumberInputState = {
  value: number;
};

class NumberInput extends React.Component<NumberInputProps, NumberInputState> {
  // Boilerplate for making this an optionally controllable component
  // https://medium.com/quick-code/writing-ui-components-with-optionally-controllable-state-86e396a6f1ec
  state: NumberInputState = {
    value: this.props.defaultValue,
  };

  isControlled = () => this.props.value !== undefined;

  onChangeDefault = (e: React.FormEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    this.setState({ value });
  };

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);

    if (this.isControlled()) {
      if (this.props.onInput !== undefined) {
        this.props.onInput(value);
      }
    } else {
      this.setState({ value }, () => {
        // Callback fn
        if (this.props.onInput) this.props.onInput(value);
      });
    }
  };

  render() {
    // this.props.value is always defined when the component is controlled
    const value = this.isControlled() ? this.props.value! : this.state.value;
    const displayString = isNaN(value) ? '' : value.toString();

    return (
      <div className='input-row'>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          type='number'
          value={displayString}
          onInput={this.handleInput}
          className={this.props.className}
          id={this.props.id}
        />
      </div>
    );
  }
}

export default NumberInput;
