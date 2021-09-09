import React from 'react';
import { AppState } from '../App';
import WeaponOption from '../js/option/weaponOptions/WeaponOption';
import Weapon from '../js/weapon/Weapon';
import Checkbox from './Checkbox';
import InputRow from './InputRow';
import IntInput from './IntInput';
import OptionInput from './OptionInput';
import WeaponPicker from './WeaponPicker';

type WeaponInputBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({
    weapon,
    weaponOptions,
  }: {
    weapon?: Weapon;
    weaponOptions?: WeaponOption[];
  }) => void;
};

class WeaponInputBlock extends React.Component<WeaponInputBlockProps> {
  setWeaponId = (id: string) => {
    const weapon = this.props.appState.weapon;
    weapon.id = id;
    const weaponOptions = weapon.passiveOptions;
    this.props.updateTotalStats({ weapon, weaponOptions });
    this.props.setAppState({ weapon, weaponOptions });
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

  setWeaponRefinement = (refinement: number) => {
    const weapon = this.props.appState.weapon;
    weapon.refinement = refinement;
    const weaponOptions = weapon.passiveOptions;
    this.props.updateTotalStats({ weapon, weaponOptions });
    this.props.setAppState({ weapon, weaponOptions });
  };

  updateOptions = () => {
    const { weaponOptions } = this.props.appState;
    this.props.updateTotalStats({ weaponOptions });
    this.props.setAppState({ weaponOptions: [...weaponOptions] });
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

        <InputRow>
          <IntInput
            id='weapon-refinement-input'
            label='Refinement:'
            defaultValue={1}
            value={appState.weapon.refinement}
            onInput={this.setWeaponRefinement}
            className='level-input'
          />
        </InputRow>

        {appState.weaponOptions.map((option) => {
          return (
            <InputRow key={option.id}>
              <OptionInput option={option} updateOptions={this.updateOptions} />
            </InputRow>
          );
        })}
      </div>
    );
  }
}

export default WeaponInputBlock;
