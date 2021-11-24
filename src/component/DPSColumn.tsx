import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import { AppState } from '../App';
import { Stats } from '../data/types';
import {
  calculateTalentValue,
  initializeAllOptions,
} from '../dps/DPSCalculator';
import { Talents } from '../talent/types';
import DPSAttackInput from './DPSAttackInput';
import FloatInput from './FloatInput';
import InputBlock from './InputBlock';
import InputRow from './InputRow';
import OHCBlock from './OHCBlock';
import Attack, { defaultAttack } from '../dps/Attack';
import OHCAttack, { calculateOHCTalentValue } from '../dps/OHCAttack';

type DPSColumnProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  artifactSetBonuses: Stats;
  talents: Talents;
};

class DPSColumn extends React.Component<DPSColumnProps> {
  dpr: number = 0;
  dps: number = NaN;

  updateTalentValue = (attack: Attack) => {
    attack.talentValue = calculateTalentValue({
      ...attack,
      ...this.props.appState,
      artifactSetBonuses: this.props.artifactSetBonuses,
      talents: this.props.talents,
    });
  };

  updateTalentValues = () => {
    const { rotation, ohcRotation } = this.props.appState;

    rotation.forEach((attack) => this.updateTalentValue(attack));
    ohcRotation.forEach((attack) => this.updateOHCTalentValues(attack));

    this.dpr =
      rotation.reduce(
        (acc, attack) =>
          acc +
          attack.talentValue.damage.reduce(
            (acc, dmg) => acc + (!isNaN(dmg) ? dmg : 0),
            0
          ) *
            (!isNaN(attack.multiplier) ? attack.multiplier : 0),
        0
      ) +
      ohcRotation.reduce(
        (acc, attack) =>
          acc +
          attack.talentValue.damage.reduce(
            (acc, dmg) => acc + (!isNaN(dmg) ? dmg : 0),
            0
          ) *
            (!isNaN(attack.multiplier) ? attack.multiplier : 0),
        0
      );

    this.dps = this.dpr / this.props.appState.rotationTime;
  };

  setRotationTime = (time: number) => {
    this.props.setAppState({ rotationTime: time });
  };

  setAttack = (i: number) => (attack: Attack) => {
    const rotation = this.props.appState.rotation;

    if (attack.talentType === '') {
      rotation.splice(i, 1);
    } else {
      rotation[i] = attack;
    }

    this.props.setAppState({ rotation });
  };

  // Ocean-Hued Clam
  updateOHCTalentValues = (attack: OHCAttack) => {
    const rotation = attack.heals;

    rotation.forEach((attack) => this.updateTalentValue(attack));

    const totalHeal = rotation.reduce(
      (acc, attack) =>
        acc +
        attack.talentValue.damage.reduce(
          (acc, dmg) => acc + (!isNaN(dmg) ? dmg : 0),
          0
        ) *
          (!isNaN(attack.multiplier) ? attack.multiplier : 0),
      0
    );

    attack.talentValue = calculateOHCTalentValue({
      totalHeal,
      ...this.props.appState,
      artifactSetBonuses: this.props.artifactSetBonuses,
      options: attack.options,
    });
  };

  hasOHC4Pc = (): boolean => {
    return this.props.appState.artifactSets.some(
      (artifactSet) =>
        artifactSet.id === 'oceanhuedclam' && artifactSet.pieces >= 4
    );
  };

  removeOHC() {
    const rotation = this.props.appState.ohcRotation;
    rotation.splice(0, rotation.length);
  }

  render() {
    const shouldRenderOHC = this.hasOHC4Pc();
    if (!shouldRenderOHC && this.props.appState.ohcRotation.length > 0) {
      this.removeOHC();
    }

    this.updateTalentValues();

    const {
      characterOptions,
      weaponOptions,
      artifactSetOptions,
      teamOptions,
      artifactBuffOptions,
      swirlOption,
    } = initializeAllOptions(this.props.appState);

    const allOptions = [
      ...characterOptions,
      ...weaponOptions,
      ...artifactSetOptions,
      ...teamOptions,
      ...artifactBuffOptions,
      swirlOption,
    ];

    return (
      <Col
        id='dps-column'
        className='input-column no-gutters border-right border-dark'
        md='auto'
        xs={12}
      >
        <InputBlock>
          <h2>DPS Calculator</h2>

          <InputRow>
            <FloatInput
              id='rotation-time-input'
              label='Rotation Time:'
              defaultValue={0}
              value={this.props.appState.rotationTime}
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

          {this.props.appState.rotation.map((attack, i) => (
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
            setAttack={this.setAttack(this.props.appState.rotation.length)}
            attack={{ ...defaultAttack }}
            index={this.props.appState.rotation.length}
            talents={this.props.talents}
            options={allOptions}
          />
        </InputBlock>

        {shouldRenderOHC && <OHCBlock {...this.props} />}
      </Col>
    );
  }
}

export default DPSColumn;
