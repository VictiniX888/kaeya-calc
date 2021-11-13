import React from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { AppState } from '../App';
import Artifact from '../artifact/Artifact';
import { propMapping } from '../data/Data';
import { Stats } from '../data/types';
import { RollDistribution, substats } from '../optimization/Optimization';
import { SubstatOptimizerResultSave } from '../optimization/OptimizerWorker';
import OptimizerWorker from '../optimization/OptimizerWorkerShim';
import { createSave, unpackArtifactSave } from '../save/Save';
import Checkbox from './Checkbox';
import FloatInput from './FloatInput';
import InputBlock from './InputBlock';
import InputRow from './InputRow';
import IntInput from './IntInput';

type OptimizerBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({ artifacts }: { artifacts?: Artifact[] }) => void;
  artifactSetBonuses: Stats;
};

type OptimizerBlockState = {
  maxRolls: number;
  selectedSubstats: string[];
  erThreshold: number;
  substatRolls: RollDistribution[];
  isOptimizing: boolean;
};

class OptimizerBlock extends React.Component<
  OptimizerBlockProps,
  OptimizerBlockState
> {
  state: OptimizerBlockState = {
    maxRolls: 20,
    selectedSubstats: [],
    erThreshold: 100,
    substatRolls: [],
    isOptimizing: false,
  };

  setMaxRolls = (maxRolls: number) => {
    this.setState({ maxRolls });
  };

  setSelectedSubstats = (stat: string) => (selected: boolean) => {
    if (selected) {
      if (!this.state.selectedSubstats.includes(stat)) {
        this.setState({
          selectedSubstats: [...this.state.selectedSubstats, stat],
        });
      }
    } else {
      if (this.state.selectedSubstats.includes(stat)) {
        this.setState({
          selectedSubstats: this.state.selectedSubstats.filter(
            (substat) => substat !== stat
          ),
        });
      }
    }
  };

  setErThreshold = (value: number) => {
    if (isNaN(value)) {
      this.setState({ erThreshold: 0 });
    } else {
      this.setState({ erThreshold: value });
    }
  };

  onOptimizeClick = async () => {
    this.setState({ substatRolls: [], isOptimizing: true });

    const save = createSave('', this.props.appState);

    // Spawns a web worker to optimize substats
    const worker = OptimizerWorker();

    const result: SubstatOptimizerResultSave = await worker.optimize({
      possibleStats: this.state.selectedSubstats,
      maxRolls: this.state.maxRolls,
      erThreshold: this.state.erThreshold / 100,
      save,
    });

    const artifacts = result.artifacts.map(unpackArtifactSave);

    this.props.updateTotalStats({ artifacts });
    this.props.setAppState({ artifacts });
    this.setState({ substatRolls: result.subStatRolls, isOptimizing: false });
  };

  render() {
    return (
      <Accordion>
        <Card className=' optimizer-card bg-transparent border-dark border-left-0 border-right-0 rounded-0'>
          <Accordion.Toggle
            as={Card.Header}
            eventKey='0'
            className='bg-transparent border-0'
          >
            <h3>Substat Optimizer</h3>
            <p>Click to expand/collapse</p>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <InputBlock>
                <p>Fixed Substats: 20</p>

                <InputRow>
                  <IntInput
                    className='level-input'
                    id={'optimizer-liquid-substats'}
                    label='Liquid Substats:'
                    defaultValue={20}
                    value={this.state.maxRolls}
                    onInput={this.setMaxRolls}
                  />
                </InputRow>
              </InputBlock>

              <InputBlock>
                <p>Select substats to optimize:</p>
                {Object.keys(substats).map((stat) => (
                  <InputRow key={stat}>
                    <Checkbox
                      id={`optimizer-selected-substats-${stat}`}
                      label={`${propMapping[stat].name}`}
                      defaultValue={false}
                      value={this.state.selectedSubstats.includes(stat)}
                      onChange={this.setSelectedSubstats(stat)}
                    />
                  </InputRow>
                ))}
              </InputBlock>

              <InputBlock>
                <InputRow>
                  <FloatInput
                    className='stat-input'
                    id={'optimizer-er-threshold'}
                    label='ER Threshold:'
                    defaultValue={100}
                    value={this.state.erThreshold}
                    onInput={this.setErThreshold}
                  />
                </InputRow>
              </InputBlock>

              <InputBlock>
                <InputRow>
                  <Button
                    variant={
                      !this.state.isOptimizing
                        ? 'secondary'
                        : 'outline-secondary'
                    }
                    size='sm'
                    onClick={this.onOptimizeClick}
                    disabled={this.state.isOptimizing}
                  >
                    {!this.state.isOptimizing ? 'Optimize' : 'Optimizing...'}
                  </Button>
                </InputRow>
              </InputBlock>

              {this.state.substatRolls.length > 0 && (
                <InputBlock>
                  <p>Liquid roll distribution:</p>
                  {this.state.substatRolls.map(({ stat, rolls }) => (
                    <p key={stat}>
                      {propMapping[stat].name}: {rolls}
                    </p>
                  ))}
                </InputBlock>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default OptimizerBlock;
