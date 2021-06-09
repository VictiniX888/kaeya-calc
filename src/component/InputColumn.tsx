import React from 'react';
import { AppState } from '../App';
import CharacterPicker from './CharacterPicker';
import Checkbox from './Checkbox';
import Column from './Column';
import NumberInput from './NumberInput';
import WeaponPicker from './WeaponPicker';

type InputColumnProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
};

class InputColumn extends React.Component<InputColumnProps> {
  setCharacterId = (id: string) => {
    const character = this.props.appState.character;
    character.id = id;
    this.props.setAppState({ character });
  };

  setCharacterLevel = (level: number) => {
    const character = this.props.appState.character;
    character.level = level;
    this.props.setAppState({ character });
  };

  setIsCharacterAscended = (isAscended: boolean) => {
    const character = this.props.appState.character;
    character.hasAscended = isAscended;
    this.props.setAppState({ character });
  };

  setWeaponId = (id: string) => {
    const weapon = this.props.appState.weapon;
    weapon.id = id;
    this.props.setAppState({ weapon });
  };

  setWeaponLevel = (level: number) => {
    const weapon = this.props.appState.weapon;
    weapon.weaponLevel = level;
    this.props.setAppState({ weapon });
  };

  setIsWeaponAscended = (isAscended: boolean) => {
    const weapon = this.props.appState.weapon;
    weapon.hasAscended = isAscended;
    this.props.setAppState({ weapon });
  };

  render() {
    const appState = this.props.appState;

    return (
      <Column className='input-column'>
        <CharacterPicker
          characterId={appState.character.id}
          setCharacterId={this.setCharacterId}
        />

        <NumberInput
          id='character-level-input'
          label='Level:'
          defaultValue={1}
          value={appState.character.level}
          onInput={this.setCharacterLevel}
          className='level-input'
        />

        <Checkbox
          id='character-ascension-checkbox'
          label='Ascended?'
          defaultValue={false}
          value={appState.character.hasAscended}
          onChange={this.setIsCharacterAscended}
        />

        <br />

        <WeaponPicker
          weaponId={appState.weapon.id}
          setWeaponId={this.setWeaponId}
        />

        <NumberInput
          id='weapon-level-input'
          label='Level:'
          defaultValue={1}
          value={appState.weapon.weaponLevel}
          onInput={this.setWeaponLevel}
          className='level-input'
        />

        <Checkbox
          id='weapon-ascension-checkbox'
          label='Ascended?'
          defaultValue={false}
          value={appState.weapon.hasAscended}
          onChange={this.setIsWeaponAscended}
        />
      </Column>
    );
  }
}

export default InputColumn;
