import React from 'react';
import Picker from './Picker';

import * as data from '../data/Data';

type CharacterPickerProps = {
  characterId: string;
  setCharacterId: (id: string) => void;
};

class CharacterPicker extends React.Component<CharacterPickerProps> {
  onChange = (value: string) => {
    this.props.setCharacterId(value);
  };

  render() {
    return (
      <Picker
        id='character-picker'
        label='Character:'
        defaultValue=''
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
