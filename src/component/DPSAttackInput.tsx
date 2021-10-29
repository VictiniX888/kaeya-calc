import React from 'react';
import InputRow from './InputRow';
import { Attack } from './DPSColumn';
import Picker from './Picker';
import { talentDescMapping } from '../data/Data';
import { getDamageDisplayValue } from '../stat/Stat';
import IntInput from './IntInput';
import { TalentValueSet } from '../talent/types';

type DPSAttackInputProps = {
  setAttack: (attack: Attack, i: number) => void;
  attack: Attack;
  index: number;
  talentValues: TalentValueSet;
};

class DPSAttackInput extends React.Component<DPSAttackInputProps> {
  setTalentType = (type: string) => {
    const attack = { ...this.props.attack, talentType: type };
    attack.talentValue = { damage: [NaN] };
    this.props.setAttack(attack, this.props.index);
  };

  setTalentId = (id: string) => {
    const attack = { ...this.props.attack, talentId: id };
    attack.talentValue = this.props.talentValues[attack.talentType]?.[
      attack.talentId
    ] ?? { damage: [NaN] };
    this.props.setAttack(attack, this.props.index);
  };

  setMultiplier = (multiplier: number) => {
    const attack = { ...this.props.attack, multiplier };
    this.props.setAttack(attack, this.props.index);
  };

  render() {
    return (
      <InputRow>
        <Picker
          id={`dps-talent-type-${this.props.index}`}
          label=''
          defaultValue=''
          value={this.props.attack.talentType}
          onChange={this.setTalentType}
          isLabelShown={false}
        >
          <Picker.Item value='' label='' />
          {Object.keys(this.props.talentValues).map((type) => (
            <Picker.Item
              key={type}
              value={type}
              label={talentDescMapping[type]}
            />
          ))}
        </Picker>

        <Picker
          id={`dps-talent-id-${this.props.index}`}
          label=''
          defaultValue=''
          value={this.props.attack.talentId}
          onChange={this.setTalentId}
          isLabelShown={false}
        >
          <Picker.Item value='' label='' />
          {Object.keys(
            this.props.talentValues[this.props.attack.talentType] ?? {}
          ).map((id) => (
            <Picker.Item key={id} value={id} label={talentDescMapping[id]} />
          ))}
        </Picker>

        {getDamageDisplayValue(this.props.attack.talentValue.damage)}

        <IntInput
          id={`dps-attack-multiplier-${this.props.index}`}
          label='x'
          defaultValue={1}
          value={this.props.attack.multiplier}
          onInput={this.setMultiplier}
          className='level-input'
        />
      </InputRow>
    );
  }
}

export default DPSAttackInput;
