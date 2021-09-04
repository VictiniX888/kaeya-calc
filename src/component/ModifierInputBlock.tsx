import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { AppState } from '../App';
import CritType from '../js/modifier/CritType';
import Reaction from '../js/modifier/Reaction';
import Resistance from '../js/Resistance';
import { capitalize } from '../js/Stat';
import { Element } from '../js/talent/types';
import FloatInput from './FloatInput';
import InputRow from './InputRow';
import IntInput from './IntInput';
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
  }: {
    enemyLevel?: number;
    enemyRes?: Resistance;
    critType?: CritType;
    reaction?: Reaction;
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

  render() {
    const { enemyLevel, enemyRes, critType, reaction } = this.props.appState;
    return (
      <div className='input-block'>
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
      </div>
    );
  }
}

export default ModifierInputBlock;
