import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { AppState } from '../App';
import CritType from '../js/modifier/CritType';
import Resistance from '../js/Resistance';
import { capitalize } from '../js/Stat';
import { Element } from '../js/talent/types';
import FloatInput from './FloatInput';
import InputRow from './InputRow';
import IntInput from './IntInput';

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
  }: {
    enemyLevel?: number;
    enemyRes?: Resistance;
    critType?: CritType;
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

  render() {
    const { enemyLevel, enemyRes, critType } = this.props.appState;
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
      </div>
    );
  }
}

export default ModifierInputBlock;
