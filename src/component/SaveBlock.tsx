import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Row from 'react-bootstrap/esm/Row';
import { AppState } from '../App';
import {
  createSave,
  addSave,
  getSave,
  loadSave,
  Saves,
  deleteSave,
} from '../save/Save';
import InputBlock from './InputBlock';
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
  showImportModal: boolean;
  showExportModal: boolean;
  saveJson: string;
  hasCopied: boolean;
  invalidJson: boolean;
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
      showImportModal: false,
      showExportModal: false,
      saveJson: '',
      hasCopied: false,
      invalidJson: false,
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

  onDeleteModalConfirm = () => {
    const saves = this.state.saves;
    deleteSave(this.state.selectedSave, saves);
    this.setState({ saves });

    this.setState({ showDeleteWarning: false });
  };

  onDeleteModalHide = () => {
    this.setState({ showDeleteWarning: false });
  };

  onImportClick = () => {
    this.setState({ showImportModal: true });
  };

  onImportModalHide = () => {
    this.setState({ showImportModal: false, saveJson: '', invalidJson: false });
  };

  onImportTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ saveJson: e.target.value });
  };

  onImportSubmitClick = () => {
    try {
      const save = JSON.parse(this.state.saveJson);
      loadSave(save, this.props.setAppState, this.props.refreshApp);
      this.onImportModalHide();
    } catch {
      this.setState({ invalidJson: true });
    }
  };

  onExportClick = () => {
    const saveJson = JSON.stringify(createSave('', this.props.appState));
    this.setState({ showExportModal: true, saveJson, invalidJson: false });
  };

  onExportModalHide = () => {
    this.setState({ showExportModal: false, saveJson: '', hasCopied: false });
  };

  onCopyClick = () => {
    navigator.clipboard.writeText(this.state.saveJson);
    this.setState({ hasCopied: true });
  };

  render() {
    return (
      <InputBlock>
        <InputRow>
          <Button variant='secondary' size='sm' onClick={this.onSaveClick}>
            Save
          </Button>

          <Col className='save-name-col'>
            <Form.Control
              type='text'
              size='sm'
              placeholder='Save label (cannot be empty)'
              onChange={this.onSaveInputChange}
            />
          </Col>
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
              onHide={this.onDeleteModalHide}
            >
              <Modal.Body>
                Are you sure you want to delete the save configuration? This
                action is irreversible!
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={this.onDeleteModalHide}>
                  Cancel
                </Button>
                <Button variant='danger' onClick={this.onDeleteModalConfirm}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </InputRow>

        <InputRow>
          <>
            <Button variant='secondary' size='sm' onClick={this.onImportClick}>
              Import
            </Button>

            <Modal
              size='lg'
              show={this.state.showImportModal}
              onHide={this.onImportModalHide}
            >
              <Modal.Header closeButton>
                Import Configuration from JSON
              </Modal.Header>
              <Modal.Body>
                <Col>
                  <Row>
                    <Form.Control
                      as='textarea'
                      rows={10}
                      value={this.state.saveJson}
                      onChange={this.onImportTextChange}
                    />
                  </Row>

                  <Row className='mt-2'>
                    <Button
                      variant='secondary'
                      size='sm'
                      onClick={this.onImportSubmitClick}
                      className='mr-2'
                    >
                      Import
                    </Button>
                    {this.state.invalidJson && 'Invalid JSON!'}
                  </Row>
                </Col>
              </Modal.Body>
            </Modal>
          </>

          <>
            <Button variant='secondary' size='sm' onClick={this.onExportClick}>
              Export
            </Button>

            <Modal
              size='lg'
              show={this.state.showExportModal}
              onHide={this.onExportModalHide}
            >
              <Modal.Header closeButton>
                Export Configuration as JSON
              </Modal.Header>
              <Modal.Body>
                <Col>
                  <Row>
                    <Form.Control
                      as='textarea'
                      rows={10}
                      value={this.state.saveJson}
                      readOnly
                    />
                  </Row>

                  <Row className='mt-2'>
                    <Button
                      variant={
                        !this.state.hasCopied ? 'secondary' : 'outline-success'
                      }
                      size='sm'
                      onClick={this.onCopyClick}
                      disabled={this.state.hasCopied}
                    >
                      {!this.state.hasCopied
                        ? 'Copy to Clipboard'
                        : 'Copied to Clipboard!'}
                    </Button>
                  </Row>
                </Col>
              </Modal.Body>
            </Modal>
          </>
        </InputRow>
      </InputBlock>
    );
  }
}

export default SaveBlock;
