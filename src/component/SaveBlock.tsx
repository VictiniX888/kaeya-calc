import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { AppState } from '../App';
import { createSave, addSave, getSave, loadSave, Saves } from '../save/Save';
import InputRow from './InputRow';

type SaveBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  refreshApp: () => void;
};

type SaveBlockState = {
  saves: Saves;
};

class SaveBlock extends React.Component<SaveBlockProps, SaveBlockState> {
  state: SaveBlockState;

  constructor(props: SaveBlockProps) {
    super(props);

    // Populate local storage if empty
    if (window.localStorage.getItem('saves') === null) {
      window.localStorage.setItem('saves', '{}');
    }

    // Initialize saves in memory
    const saves = JSON.parse(window.localStorage.getItem('saves') ?? '{}');
    this.state = { saves };
  }

  render() {
    const saves = this.state.saves;
    const { appState, setAppState, refreshApp } = this.props;

    return (
      <div className='input-block'>
        <InputRow>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => {
              const save = createSave('test', appState);
              addSave(save, saves);
            }}
          >
            Save
          </Button>

          <Button
            variant='secondary'
            size='sm'
            onClick={() => {
              const save = getSave('test', saves);
              if (save !== undefined) {
                loadSave(save, setAppState, refreshApp);
              }
            }}
          >
            Load
          </Button>
        </InputRow>
      </div>
    );
  }
}

export default SaveBlock;
