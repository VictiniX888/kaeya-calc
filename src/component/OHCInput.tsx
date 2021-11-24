import React from 'react';
import { AppState } from '../App';
import Attack, { defaultAttack } from '../dps/Attack';
import { initializeAllOptions } from '../dps/DPSCalculator';
import OHCAttack from '../dps/OHCAttack';
import { getDamageDisplayValue } from '../stat/Stat';
import { Talents } from '../talent/types';
import DPSAttackInput from './DPSAttackInput';
import InputRow from './InputRow';
import IntInput from './IntInput';

type OHCInputProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  talents: Talents;
  attack: OHCAttack;
  setAttack: (attack: OHCAttack) => void;
  index: number;
};

class OHCInput extends React.Component<OHCInputProps> {
  setMultiplier = (multiplier: number) => {
    const attack = { ...this.props.attack, multiplier };
    this.props.setAttack(attack);
  };

  setAttack = (i: number) => (attack: Attack) => {
    const ohcAttack = this.props.attack;
    const rotation = [...ohcAttack.heals];

    if (attack.talentType === '') {
      rotation.splice(i, 1);
    } else {
      rotation[i] = attack;
    }

    this.props.setAttack({ ...ohcAttack, heals: rotation });
  };

  render() {
    const {
      characterOptions,
      weaponOptions,
      artifactSetOptions,
      teamOptions,
      artifactBuffOptions,
    } = initializeAllOptions(this.props.appState);

    const allOptions = [
      ...characterOptions,
      ...weaponOptions,
      ...artifactSetOptions,
      ...teamOptions,
      ...artifactBuffOptions,
    ];

    return (
      <>
        <InputRow>
          {getDamageDisplayValue(this.props.attack.talentValue.damage)}

          <IntInput
            id={`ohc-input-multiplier`}
            label='x'
            defaultValue={1}
            value={this.props.attack.multiplier}
            onInput={this.setMultiplier}
            className='level-input'
          />
        </InputRow>

        {this.props.attack.heals.map((attack, i) => (
          <DPSAttackInput
            key={i}
            setAttack={this.setAttack(i)}
            attack={attack}
            index={i}
            talents={this.props.talents}
            options={allOptions}
          />
        ))}

        <DPSAttackInput
          setAttack={this.setAttack(this.props.attack.heals.length)}
          attack={{ ...defaultAttack }}
          index={this.props.attack.heals.length}
          talents={this.props.talents}
          options={allOptions}
        />
      </>
    );
  }
}

export default OHCInput;
