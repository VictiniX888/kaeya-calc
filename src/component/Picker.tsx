import React from 'react';
import Form from 'react-bootstrap/esm/Form';

type PickerProps = {
  id: string;
  label: string;
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  isLabelShown?: boolean;
  className?: string;
};

type PickerState = {
  value: string;
};

type PickerItemProps = {
  label: string;
  value: string;
};

class Picker extends React.Component<PickerProps, PickerState> {
  // Boilerplate for making this an optionally controllable component
  // https://medium.com/quick-code/writing-ui-components-with-optionally-controllable-state-86e396a6f1ec
  state: PickerState = {
    value: this.props.defaultValue,
  };

  isControlled = () => this.props.value !== undefined;

  isLabelShown = () => this.props.isLabelShown ?? true;

  onChangeDefault = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    this.setState({ value: selectedValue });
  };

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (this.isControlled()) {
      if (this.props.onChange !== undefined) {
        this.props.onChange(selectedValue);
      }
    } else {
      this.setState({ value: selectedValue }, () => {
        // Callback fn
        if (this.props.onChange) this.props.onChange(selectedValue);
      });
    }
  };

  render() {
    const selectedValue = this.isControlled()
      ? this.props.value
      : this.state.value;

    return (
      <>
        <Form.Label htmlFor={this.props.id} srOnly={!this.isLabelShown()}>
          {this.props.label}
        </Form.Label>
        <Form.Control
          as='select'
          size='sm'
          value={selectedValue}
          onChange={this.handleChange}
          className={`picker ${this.props.className ?? ''}`}
          id={this.props.id}
        >
          {this.props.children}
        </Form.Control>
      </>
    );
  }

  static Item = class Item extends React.Component<PickerItemProps> {
    render() {
      return <option value={this.props.value}>{this.props.label}</option>;
    }
  };
}

export default Picker;
