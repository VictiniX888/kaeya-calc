import React from 'react';
import { AppState } from '../App';
import OHCAttack, { defaultOHCAttack } from '../dps/OHCAttack';
import { Talents } from '../talent/types';
import InputBlock from './InputBlock';
import OHCInput from './OHCInput';

type OHCBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  talents: Talents;
};

class OHCBlock extends React.Component<OHCBlockProps> {
  setAttack = (i: number) => (attack: OHCAttack) => {
    const rotation = this.props.appState.ohcRotation;

    if (attack.heals.length === 0) {
      rotation.splice(i, 1);
    } else {
      rotation[i] = attack;
    }

    this.props.setAppState({ ohcRotation: rotation });
  };

  render() {
    const rotation = this.props.appState.ohcRotation;
    return (
      <InputBlock>
        <h3>Ocean-Hued Clam</h3>

        {rotation.map((attack, i) => (
          <OHCInput
            key={i}
            {...this.props}
            attack={attack}
            setAttack={this.setAttack(i)}
            index={i}
          />
        ))}

        <OHCInput
          {...this.props}
          attack={{ ...defaultOHCAttack }}
          setAttack={this.setAttack(rotation.length)}
          index={rotation.length}
        />
      </InputBlock>
    );
  }
}

export default OHCBlock;
