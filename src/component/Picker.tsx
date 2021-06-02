import React from 'react';

type PickerProps = {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type PickerItemProps = {
  label: string;
  value: string;
};

class Picker extends React.Component<PickerProps> {
  handleChangeDefault = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    this.setState({ value: selectedValue });
  };

  handleChange = this.props.onChange ?? this.handleChangeDefault;

  render() {
    console.log();
    return (
      <div>
        <label>{this.props.label}</label>
        <select value={this.props.value} onChange={this.handleChange}>
          {this.props.children}
        </select>
      </div>
    );
  }

  static Item = class Item extends React.Component<PickerItemProps> {
    render() {
      return <option value={this.props.value}>{this.props.label}</option>;
    }
  };
}

export default Picker;
