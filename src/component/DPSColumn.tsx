import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import InputRow from './InputRow';
import FloatInput from './FloatInput';
import { TalentValue, TalentValueSet } from '../talent/types';
import Option from '../option/Option';
import DPSAttackInput from './DPSAttackInput';

export type Attack = {
  talentType: string;
  talentId: string;
  multiplier: number;
  talentValue: TalentValue;
  options: Option[];
};

const defaultAttack: Attack = {
  talentType: '',
  talentId: '',
  multiplier: 1,
  talentValue: { damage: [NaN] },
  options: [],
};

type DPSColumnProps = {
  talentValues: TalentValueSet;
};

type DPSColumnState = {
  rotationTime: number;
  rotation: Attack[];
};

class DPSColumn extends React.Component<DPSColumnProps, DPSColumnState> {
  state: DPSColumnState = {
    rotationTime: 0,
    rotation: [],
  };

  dpr: number = 0;
  dps: number = NaN;

  setRotationTime = (time: number) => {
    this.dps = this.dpr / time;
    this.setState({ rotationTime: time });
  };

  setAttack = (attack: Attack, i: number) => {
    const rotation = this.state.rotation;

    if (attack.talentType === '') {
      rotation.splice(i, 1);
    } else {
      rotation[i] = attack;
    }

    this.dpr = rotation.reduce(
      (acc, attack) =>
        acc +
        attack.talentValue.damage.reduce(
          (acc, dmg) => acc + (!isNaN(dmg) ? dmg : 0)
        ) *
          attack.multiplier,
      0
    );
    this.dps = this.dpr / this.state.rotationTime;

    this.setState({ rotation });
  };

  render() {
    return (
      <Col
        id='dps-column'
        className='input-column no-gutters border-right border-dark'
        md='auto'
        xs={12}
      >
        <h2>DPS Calculator</h2>

        <InputRow>
          <FloatInput
            id='rotation-time-input'
            label='Rotation Time:'
            defaultValue={0}
            value={this.state.rotationTime}
            onInput={this.setRotationTime}
            className='level-input'
          />
        </InputRow>

        <InputRow>
          <p>DPR: {this.dpr.toFixed(0)}</p>
        </InputRow>

        <InputRow>
          <p>DPS: {isFinite(this.dps) ? this.dps.toFixed(0) : '-'}</p>
        </InputRow>

        {this.state.rotation.map((attack, i) => (
          <DPSAttackInput
            setAttack={this.setAttack}
            attack={attack}
            index={i}
            talentValues={this.props.talentValues}
          />
        ))}

        <DPSAttackInput
          setAttack={this.setAttack}
          attack={{ ...defaultAttack }}
          index={this.state.rotation.length}
          talentValues={this.props.talentValues}
        />
      </Col>
    );
  }
}

export default DPSColumn;
