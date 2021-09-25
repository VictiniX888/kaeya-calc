import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import { AppState } from '../App';
import { Stats } from '../data/types';
import Artifact from '../js/artifact/Artifact';
import { propMapping } from '../js/Data';
import DamageModifier from '../js/modifier/DamageModifer';
import {
  optimizeSubstats,
  RollDistribution,
} from '../js/optimization/Optimization';
import { StatMixin } from '../js/option/Mixin';
import { TalentType } from '../js/talent/types';

type OptimizerColumnProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({ artifacts }: { artifacts?: Artifact[] }) => void;
  artifactSetBonuses: Stats;
  damageModifier: DamageModifier;
  statMixins: StatMixin[];
};

type OptimizerColumnState = {
  substatRolls: RollDistribution[];
};

class OptimizerColumn extends React.Component<
  OptimizerColumnProps,
  OptimizerColumnState
> {
  state: OptimizerColumnState = {
    substatRolls: [],
  };

  onOptimizeClick = () => {
    const result = optimizeSubstats(
      // Temporary arguments
      ['atkBonus', 'critRate', 'critDmg'],
      45,
      TalentType.Attack,
      '1HitDmg',
      this.props.appState,
      this.props.artifactSetBonuses,
      this.props.damageModifier,
      this.props.statMixins
    );

    this.props.updateTotalStats({ artifacts: result.artifacts });
    this.props.setAppState({ artifacts: result.artifacts });
    this.setState({ substatRolls: result.subStatRolls });
  };

  render() {
    return (
      <Col
        id='optimizer-column'
        className='input-column no-gutters border-right border-dark'
        md='auto'
        xs={12}
      >
        <Button variant='secondary' size='sm' onClick={this.onOptimizeClick}>
          Optimize
        </Button>

        {this.state.substatRolls.map(({ stat, rolls }) => (
          <p key={stat}>
            {propMapping[stat].name}: {rolls}
          </p>
        ))}
      </Col>
    );
  }
}

export default OptimizerColumn;
