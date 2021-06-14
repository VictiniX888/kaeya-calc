import React from 'react';
import Column from './Column';
import { TalentType, TalentValueSet } from '../js/talent/types';
import TalentBlock from './TalentBlock';

type TalentColumnProps = {
  talentValues: TalentValueSet;
};

class TalentColumn extends React.Component<TalentColumnProps> {
  render() {
    const { attack, skill, burst } = this.props.talentValues;

    return (
      <Column className='talent-column'>
        <div className='result-block'>
          <h2>Talents</h2>
          <TalentBlock type={TalentType.Attack} talentValues={attack} />
          <TalentBlock type={TalentType.Skill} talentValues={skill} />
          <TalentBlock type={TalentType.Burst} talentValues={burst} />
        </div>
      </Column>
    );
  }
}

export default TalentColumn;
