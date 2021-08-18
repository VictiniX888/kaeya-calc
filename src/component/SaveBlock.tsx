import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { AppState } from '../App';
import { createSave, addSave, getSave, loadSave, Saves } from '../save/Save';
import InputRow from './InputRow';
import Picker from './Picker';

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
  saveInputName: string;
  selectedSave: string;
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
    this.state = { saves, saveInputName: '', selectedSave: '' };
  }

  onSaveClick = () => {
    if (this.state.saveInputName !== '') {
      const save = createSave(this.state.saveInputName, this.props.appState);
      const saves = this.state.saves;
      addSave(save, saves);
      this.setState({ saves });
    }
  };

  onSaveInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ saveInputName: e.target.value });
  };

  onLoadClick = () => {
    if (this.state.selectedSave !== '') {
      const save = getSave(this.state.selectedSave, this.state.saves);
      if (save !== undefined) {
        loadSave(save, this.props.setAppState, this.props.refreshApp);
      }
    }
  };

  onLoadInputChange = (value: string) => {
    this.setState({ selectedSave: value });
  };

  render() {
    return (
      <div className='input-block'>
        <InputRow>
          <Button variant='secondary' size='sm' onClick={this.onSaveClick}>
            Save
          </Button>

          <Form.Control
            type='text'
            size='sm'
            placeholder='Save label (cannot be empty)'
            onChange={this.onSaveInputChange}
          />
        </InputRow>

        <InputRow>
          <Button variant='secondary' size='sm' onClick={this.onLoadClick}>
            Load
          </Button>

          <Picker
            id='save-picker'
            label=''
            defaultValue=''
            value={this.state.selectedSave}
            onChange={this.onLoadInputChange}
            isLabelShown={false}
          >
            <Picker.Item label='' value='' />
            {Object.values(this.state.saves).map((save) => (
              <Picker.Item
                label={save.label}
                value={save.label}
                key={save.label}
              />
            ))}
          </Picker>
        </InputRow>
      </div>
    );
  }
}

export default SaveBlock;
