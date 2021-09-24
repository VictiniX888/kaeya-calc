import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import { AppState } from '../App';
import { Stats } from '../data/types';
import Artifact from '../js/artifact/Artifact';
import DamageModifier from '../js/modifier/DamageModifer';
import { optimizeSubstats } from '../js/optimization/Optimization';
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

class OptimizerColumn extends React.Component<OptimizerColumnProps> {
  onOptimizeClick = () => {
    const result = optimizeSubstats(
      // Temporary arguments
      ['atkBonus', 'flatAtk', 'critRate', 'critDmg'],
      25,
      TalentType.Attack,
      '1HitDmg',
      this.props.appState,
      this.props.artifactSetBonuses,
      this.props.damageModifier,
      this.props.statMixins
    );

    this.props.updateTotalStats({ artifacts: result.artifacts });
    this.props.setAppState({ artifacts: result.artifacts });
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
      </Col>
    );
  }
}

export default OptimizerColumn;
