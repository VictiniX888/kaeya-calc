import React from 'react';
import { TalentValueSet } from '../talent/types';
import TalentBlock from './TalentBlock';
import Col from 'react-bootstrap/esm/Col';

type TalentColumnProps = {
  talentValues: TalentValueSet;
};

class TalentColumn extends React.Component<TalentColumnProps> {
  render() {
    const talentValues = this.props.talentValues;

    return (
      <Col
        id='talent-column'
        className='talent-column no-gutters border-right border-dark'
        md='auto'
        xs={12}
      >
        <div className='result-block'>
          <h2>Talents</h2>
          {Object.entries(talentValues).map(([type, values]) => (
            <TalentBlock key={type} type={type} talentValues={values} />
          ))}
        </div>
      </Col>
    );
  }
}

export default TalentColumn;
