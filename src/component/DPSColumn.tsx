import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import InputRow from './InputRow';
import FloatInput from './FloatInput';
import { TalentValue, TalentValueSet } from '../talent/types';
import DPSAttackInput from './DPSAttackInput';
import { AppState } from '../App';
import DamageModifier from '../modifier/DamageModifer';
import { ModifierMixin, StatMixin } from '../option/Mixin';
import { Stats } from '../data/types';
import {
  calculateTalentValue,
  initializeAllOptions,
} from '../dps/DPSCalculator';
import ArtifactSetOption from '../option/artifactSetOptions/ArtifactSetOption';
import CharacterOption from '../option/characterOptions/CharacterOption';
import WeaponOption from '../option/weaponOptions/WeaponOption';
import Option from '../option/Option';

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
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  artifactSetBonuses: Stats;
  getDamageModifier: ({
    modifierMixins,
  }: {
    modifierMixins: ModifierMixin[];
  }) => DamageModifier;
  getStatMixins: ({
    characterOptions,
    weaponOptions,
    artifactSetOptions,
    teamOptions,
    updateCache,
  }: {
    characterOptions?: CharacterOption[];
    weaponOptions?: WeaponOption[];
    artifactSetOptions?: ArtifactSetOption[];
    teamOptions?: CharacterOption[];
    updateCache?: boolean;
  }) => StatMixin[];
  getModifierMixins: ({
    characterOptions,
    weaponOptions,
    artifactSetOptions,
    teamOptions,
    updateCache,
  }: {
    characterOptions?: CharacterOption[];
    weaponOptions?: WeaponOption[];
    artifactSetOptions?: ArtifactSetOption[];
    teamOptions?: CharacterOption[];
    updateCache?: boolean;
  }) => ModifierMixin[];
  talentValues: TalentValueSet;
};

class DPSColumn extends React.Component<DPSColumnProps> {
  dpr: number = 0;
  dps: number = NaN;

  updateTalentValue = (attack: Attack) => {
    attack.talentValue = calculateTalentValue(
      attack.talentType,
      attack.talentId,
      attack.options,
      this.props.appState,
      this.props.artifactSetBonuses,
      this.props.getDamageModifier,
      this.props.getStatMixins,
      this.props.getModifierMixins
    );
  };

  updateTalentValues = () => {
    const rotation = this.props.appState.rotation;

    rotation.forEach((attack) => this.updateTalentValue(attack));

    this.dpr = rotation.reduce(
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

  render() {
    this.updateTalentValues();

    const { characterOptions, weaponOptions, artifactSetOptions, teamOptions } =
      initializeAllOptions(this.props.appState);

    const allOptions = [
      ...characterOptions,
      ...weaponOptions,
      ...artifactSetOptions,
      ...teamOptions,
    ];

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
            talentValues={this.props.talentValues}
            options={allOptions}
          />
        ))}

        <DPSAttackInput
          setAttack={this.setAttack(this.props.appState.rotation.length)}
          attack={{ ...defaultAttack }}
          index={this.props.appState.rotation.length}
          talentValues={this.props.talentValues}
          options={allOptions}
        />
      </Col>
    );
  }
}

export default DPSColumn;
