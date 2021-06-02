import React from 'react';
import Picker from './Picker';

import * as data from '../js/Data';

type CharacterPickerProps = {
  characterId: string;
  setCharacterId: (id: string) => void;
};

class CharacterPicker extends React.Component<CharacterPickerProps> {
  onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    this.props.setCharacterId(selectedValue);
  };

  render() {
    return (
      <Picker
        label='Character: '
        value={this.props.characterId}
        onChange={this.onChange}
      >
        <Picker.Item label='' value='' />
        {data.getSortedCharacterList().map((id) => (
          <Picker.Item
            label={data.getCharacterData(id).name}
            value={id}
            key={id}
          />
        ))}
      </Picker>
    );
  }
}

export default CharacterPicker;
