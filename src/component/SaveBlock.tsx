import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import { AppState } from '../App';
import {
  createSave,
  addSave,
  getSave,
  loadSave,
  Saves,
  deleteSave,
} from '../save/Save';
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
  showDeleteWarning: boolean;
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
    // Initialize state
    this.state = {
      saves,
      saveInputName: '',
      selectedSave: '',
      showDeleteWarning: false,
    };
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

  onDeleteClick = () => {
    if (this.state.selectedSave !== '') {
      this.setState({ showDeleteWarning: true });
    }
  };

  onModalConfirm = () => {
    const saves = this.state.saves;
    deleteSave(this.state.selectedSave, saves);
    this.setState({ saves });

    this.setState({ showDeleteWarning: false });
  };

  onModalHide = () => {
    this.setState({ showDeleteWarning: false });
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

          <>
            <Button variant='danger' size='sm' onClick={this.onDeleteClick}>
              Delete
            </Button>

            <Modal
              show={this.state.showDeleteWarning}
              onHide={this.onModalHide}
            >
              <Modal.Body>
                Are you sure you want to delete the save configuration? This
                action is irreversible!
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={this.onModalHide}>
                  Cancel
                </Button>
                <Button variant='danger' onClick={this.onModalConfirm}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </InputRow>
      </div>
    );
  }
}

export default SaveBlock;
