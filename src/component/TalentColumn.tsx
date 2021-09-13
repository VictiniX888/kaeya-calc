import React from 'react';
import { TalentType, TalentValueSet } from '../js/talent/types';
import TalentBlock from './TalentBlock';
import Col from 'react-bootstrap/esm/Col';

type TalentColumnProps = {
  talentValues: TalentValueSet;
};

class TalentColumn extends React.Component<TalentColumnProps> {
  render() {
    const { attack, skill, burst } = this.props.talentValues;

    return (
      <Col
        className='talent-column no-gutters border-right border-dark'
        xl='auto'
      >
        <div className='result-block'>
          <h2>Talents</h2>
          <TalentBlock type={TalentType.Attack} talentValues={attack} />
          <TalentBlock type={TalentType.Skill} talentValues={skill} />
          <TalentBlock type={TalentType.Burst} talentValues={burst} />
        </div>
      </Col>
    );
  }
}

export default TalentColumn;
