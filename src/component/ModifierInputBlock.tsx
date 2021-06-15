import React from 'react';
import { AppState } from '../App';
import Resistance from '../js/Resistance';
import { capitalize } from '../js/Stat';
import { Element } from '../js/talent/types';
import FloatInput from './FloatInput';
import InputRow from './InputRow';

type ModifierInputBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTalentValues: ({ enemyRes }: { enemyRes?: Resistance }) => void;
};

class ModifierInputBlock extends React.Component<ModifierInputBlockProps> {
  setEnemyRes = (type: Element) => (value: number) => {
    const enemyRes = this.props.appState.enemyRes;
    enemyRes.set(type, value / 100);
    this.props.updateTalentValues({ enemyRes });
    this.props.setAppState({ enemyRes });
  };

  render() {
    const { enemyRes } = this.props.appState;
    return (
      <div className='input-block'>
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
