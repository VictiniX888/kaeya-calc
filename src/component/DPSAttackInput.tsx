import React from 'react';
import InputRow from './InputRow';
import Picker from './Picker';
import { talentDescMapping } from '../data/Data';
import { getDamageDisplayValue } from '../stat/Stat';
import IntInput from './IntInput';
import { Talents } from '../talent/types';
import DPSOptionInput from './DPSOptionInput';
import Option from '../option';
import Attack from '../dps/Attack';

type DPSAttackInputProps = {
  setAttack: (attack: Attack) => void;
  attack: Attack;
  index: number;
  talents: Talents;
  options: Option[];
};

class DPSAttackInput extends React.Component<DPSAttackInputProps> {
  setTalentType = (type: string) => {
    const attack = { ...this.props.attack, talentType: type };
    this.props.setAttack(attack);
  };

  setTalentId = (id: string) => {
    const attack = { ...this.props.attack, talentId: id };
    this.props.setAttack(attack);
  };

  setMultiplier = (multiplier: number) => {
    const attack = { ...this.props.attack, multiplier };
    this.props.setAttack(attack);
  };

  setOption = (i: number) => (option?: Option) => {
    const options = [...this.props.attack.options];

    if (option === undefined) {
      options.splice(i, 1);
    } else {
      options[i] = option;
    }

    this.props.setAttack({ ...this.props.attack, options });
  };

  render() {
    return (
      <>
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
            {Object.keys(this.props.talents).map((type) => (
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
              this.props.talents[this.props.attack.talentType] ?? {}
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

        {this.props.attack.options.map((option, i) => (
          <DPSOptionInput
            key={i}
            setOption={this.setOption(i)}
            options={this.props.options}
            option={option}
            index={i}
          />
        ))}

        <DPSOptionInput
          setOption={this.setOption(this.props.attack.options.length)}
          options={this.props.options}
          index={this.props.attack.options.length}
        />
      </>
    );
  }
}

export default DPSAttackInput;
