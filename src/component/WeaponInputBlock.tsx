import React from 'react';
import { AppState } from '../App';
import Weapon from '../js/weapon/Weapon';
import Checkbox from './Checkbox';
import InputRow from './InputRow';
import IntInput from './IntInput';
import WeaponPicker from './WeaponPicker';

type WeaponInputBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({ weapon }: { weapon?: Weapon }) => void;
};

class WeaponInputBlock extends React.Component<WeaponInputBlockProps> {
  setWeaponId = (id: string) => {
    const weapon = this.props.appState.weapon;
    weapon.id = id;
    this.props.updateTotalStats({ weapon });
    this.props.setAppState({ weapon });
  };

  setWeaponLevel = (level: number) => {
    const weapon = this.props.appState.weapon;
    weapon.weaponLevel = level;
    this.props.updateTotalStats({ weapon });
    this.props.setAppState({ weapon });
  };

  setIsWeaponAscended = (isAscended: boolean) => {
    const weapon = this.props.appState.weapon;
    weapon.hasAscended = isAscended;
    this.props.updateTotalStats({ weapon });
    this.props.setAppState({ weapon });
  };

  render() {
    const { appState } = this.props;
    return (
      <div className='input-block'>
        <InputRow>
          <WeaponPicker
            weaponId={appState.weapon.id}
            setWeaponId={this.setWeaponId}
          />
        </InputRow>

        <InputRow>
          <IntInput
            id='weapon-level-input'
            label='Level:'
            defaultValue={1}
            value={appState.weapon.weaponLevel}
            onInput={this.setWeaponLevel}
            className='level-input'
          />
        </InputRow>

        <InputRow>
          <Checkbox
            id='weapon-ascension-checkbox'
            label='Ascended?'
            defaultValue={false}
            value={appState.weapon.hasAscended}
            onChange={this.setIsWeaponAscended}
          />
        </InputRow>
      </div>
    );
  }
}

export default WeaponInputBlock;
