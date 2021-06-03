import React from 'react';

type CheckboxProps = {
  id: string;
  label: string;
  defaultValue: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
};

type CheckboxState = {
  value: boolean;
};

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  // Boilerplate for making this an optionally controllable component
  // https://medium.com/quick-code/writing-ui-components-with-optionally-controllable-state-86e396a6f1ec
  state: CheckboxState = {
    value: this.props.defaultValue,
  };

  isControlled = () => this.props.value !== undefined;

  onChangeDefault = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    this.setState({ value });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    if (this.isControlled()) {
      if (this.props.onChange !== undefined) {
        this.props.onChange(value);
      }
    } else {
      this.setState({ value }, () => {
        // Callback fn
        if (this.props.onChange) this.props.onChange(value);
      });
    }
  };

  render() {
    const value = this.isControlled() ? this.props.value : this.state.value;
    return (
      <div className='input-row'>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          type='checkbox'
          checked={value}
          onChange={this.handleChange}
          className={this.props.className}
          id={this.props.id}
        />
      </div>
    );
  }
}

export default Checkbox;
