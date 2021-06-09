import React from 'react';
import Picker from './Picker';

import * as data from '../js/Data';

type WeaponPickerProps = {
  weaponId: string;
  setWeaponId: (id: string) => void;
};

class WeaponPicker extends React.Component<WeaponPickerProps> {
  onChange = (value: string) => {
    this.props.setWeaponId(value);
  };

  render() {
    return (
      <Picker
        id='weapon-picker'
        label='Weapon:'
        defaultValue=''
        value={this.props.weaponId}
        onChange={this.onChange}
      >
        <Picker.Item label='' value='' />
        {data.getSortedWeaponList().map((id) => (
          <Picker.Item
            label={data.getWeaponData(id).name}
            value={id}
            key={id}
          />
        ))}
      </Picker>
    );
  }
}

export default WeaponPicker;
