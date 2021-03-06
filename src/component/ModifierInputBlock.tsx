import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { AppState } from '../App';
import CritType from '../modifier/CritType';
import Reaction from '../modifier/Reaction';
import SwirlOption from '../option/characterOptions/SwirlOption';
import Resistance from '../stat/Resistance';
import { capitalize } from '../stat/Stat';
import { Element } from '../talent/types';
import FloatInput from './FloatInput';
import InputBlock from './InputBlock';
import InputRow from './InputRow';
import IntInput from './IntInput';
import OptionInput from './OptionInput';
import Picker from './Picker';

type ModifierInputBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTalentValues: ({
    enemyLevel,
    enemyRes,
    critType,
    reaction,
    swirlOption,
  }: {
    enemyLevel?: number;
    enemyRes?: Resistance;
    critType?: CritType;
    reaction?: Reaction;
    swirlOption?: SwirlOption;
  }) => void;
};

class ModifierInputBlock extends React.Component<ModifierInputBlockProps> {
  setEnemyLevel = (level: number) => {
    this.props.updateTalentValues({ enemyLevel: level });
    this.props.setAppState({ enemyLevel: level });
  };

  setEnemyRes = (type: Element) => (value: number) => {
    const enemyRes = this.props.appState.enemyRes;
    enemyRes.set(type, value / 100);
    this.props.updateTalentValues({ enemyRes });
    this.props.setAppState({ enemyRes });
  };

  setCritType = (critType: CritType) => {
    this.props.updateTalentValues({ critType });
    this.props.setAppState({ critType });
  };

  setReaction = (reaction: string) => {
    this.props.updateTalentValues({
      reaction: Reaction[reaction as keyof typeof Reaction],
    });
    this.props.setAppState({
      reaction: Reaction[reaction as keyof typeof Reaction],
    });
  };

  updateSwirlOption = () => {
    const swirlOption = this.props.appState.swirlOption;
    this.props.updateTalentValues({ swirlOption });
    this.props.setAppState({ swirlOption });
  };

  render() {
    const { enemyLevel, enemyRes, critType, reaction } = this.props.appState;
    return (
      <InputBlock>
        <InputRow>
          Crit:
          <ToggleButtonGroup
            name='crit-type-input'
            type='radio'
            size='sm'
            value={critType}
            onChange={this.setCritType}
          >
            <ToggleButton value='none' variant='outline-secondary'>
              None
            </ToggleButton>
            <ToggleButton value='crit' variant='outline-secondary'>
              Crit
            </ToggleButton>
            <ToggleButton value='average' variant='outline-secondary'>
              Average
            </ToggleButton>
          </ToggleButtonGroup>
        </InputRow>

        <InputRow>
          <IntInput
            id='enemy-level-input'
            label='Enemy Level:'
            defaultValue={1}
            value={enemyLevel}
            onInput={this.setEnemyLevel}
            className='level-input'
          />
        </InputRow>

        {Object.values(Element).map((element) => (
          <InputRow key={element}>
            <FloatInput
              id={`enemy-res-${element}-input`}
              label={`Enemy ${capitalize(element)} RES:`}
              defaultValue={0}
              value={enemyRes.get(element) * 100}
              onInput={this.setEnemyRes(element)}
              className='level-input'
            />
            <p>%</p>
          </InputRow>
        ))}

        <InputRow>
          <Picker
            id='reaction-picker'
            label='Reaction:'
            defaultValue={Reaction.None}
            value={reaction}
            onChange={this.setReaction}
          >
            {Object.values(Reaction).map((reaction) => (
              <Picker.Item
                key={reaction}
                label={capitalize(reaction)}
                value={reaction}
              />
            ))}
          </Picker>
        </InputRow>

        <InputRow>
          <OptionInput
            option={this.props.appState.swirlOption}
            updateOptions={this.updateSwirlOption}
          />
        </InputRow>
      </InputBlock>
    );
  }
}

export default ModifierInputBlock;
