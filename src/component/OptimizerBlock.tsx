import React from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { AppState } from '../App';
import { Stats } from '../data/types';
import Artifact from '../js/artifact/Artifact';
import { propMapping, talentDescMapping } from '../js/Data';
import DamageModifier from '../js/modifier/DamageModifer';
import {
  optimizeSubstats,
  RollDistribution,
  substats,
} from '../js/optimization/Optimization';
import { StatMixin } from '../js/option/Mixin';
import { capitalize } from '../js/Stat';
import { TalentType, TalentValueSet } from '../js/talent/types';
import Checkbox from './Checkbox';
import InputRow from './InputRow';
import IntInput from './IntInput';
import Picker from './Picker';

type OptimizerBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({ artifacts }: { artifacts?: Artifact[] }) => void;
  artifactSetBonuses: Stats;
  damageModifier: DamageModifier;
  statMixins: StatMixin[];
  talentValues: TalentValueSet;
};

type OptimizerBlockState = {
  maxRolls: number;
  selectedSubstats: string[];
  targetTalentType?: TalentType;
  targetTalentId: string;
  substatRolls: RollDistribution[];
};

class OptimizerBlock extends React.Component<
  OptimizerBlockProps,
  OptimizerBlockState
> {
  state: OptimizerBlockState = {
    substatRolls: [],
    selectedSubstats: [],
    targetTalentId: '',
    maxRolls: 20,
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

  setTargetTalentType = (value: string) => {
    if (value === '') {
      this.setState({ targetTalentType: undefined });
    } else {
      this.setState({ targetTalentType: value as TalentType });
    }
  };

  setTargetTalentId = (value: string) => {
    this.setState({ targetTalentId: value });
  };

  onOptimizeClick = () => {
    if (
      this.state.targetTalentType !== undefined &&
      this.state.targetTalentId !== ''
    ) {
      const result = optimizeSubstats(
        this.state.selectedSubstats,
        this.state.maxRolls,
        this.state.targetTalentType,
        this.state.targetTalentId,
        this.props.appState,
        this.props.artifactSetBonuses,
        this.props.damageModifier,
        this.props.statMixins
      );

      this.props.updateTotalStats({ artifacts: result.artifacts });
      this.props.setAppState({ artifacts: result.artifacts });
      this.setState({ substatRolls: result.subStatRolls });
    }
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
              <div className='input-block'>
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
              </div>

              <div className='input-block'>
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
              </div>

              <div className='input-block'>
                <InputRow>
                  <Picker
                    id={`optimizer-target-talent-type`}
                    label='Target Talent Type:'
                    defaultValue=''
                    value={this.state.targetTalentType ?? ''}
                    onChange={this.setTargetTalentType}
                  >
                    <Picker.Item value='' label='' />
                    <Picker.Item
                      value={TalentType.Attack}
                      label={capitalize(TalentType.Attack)}
                    />
                    <Picker.Item
                      value={TalentType.Skill}
                      label={capitalize(TalentType.Skill)}
                    />
                    <Picker.Item
                      value={TalentType.Burst}
                      label={capitalize(TalentType.Burst)}
                    />
                  </Picker>
                </InputRow>

                <InputRow>
                  <Picker
                    id={`optimizer-target-talent-id`}
                    label='Target Talent Name:'
                    defaultValue=''
                    value={this.state.targetTalentId ?? ''}
                    onChange={this.setTargetTalentId}
                  >
                    <Picker.Item value='' label='' />
                    {this.state.targetTalentType
                      ? this.props.talentValues[
                          this.state.targetTalentType
                        ].map(({ description }) => (
                          <Picker.Item
                            key={description}
                            value={description}
                            label={talentDescMapping[description]}
                          />
                        ))
                      : null}
                  </Picker>
                </InputRow>
              </div>

              <div className='input-block'>
                <InputRow>
                  <Button
                    variant='secondary'
                    size='sm'
                    onClick={this.onOptimizeClick}
                  >
                    Optimize
                  </Button>
                </InputRow>
              </div>

              <div className='input-block'>
                {this.state.substatRolls.length > 0 && (
                  <p>Liquid roll distribution:</p>
                )}

                {this.state.substatRolls.map(({ stat, rolls }) => (
                  <p key={stat}>
                    {propMapping[stat].name}: {rolls}
                  </p>
                ))}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default OptimizerBlock;
