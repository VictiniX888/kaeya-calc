import React from 'react';
import { talentDescMapping } from '../js/Data';
import { capitalize, getDamageDisplayValue } from '../js/Stat';
import { TalentType, TalentValue } from '../js/talent/types';

type TalentBlockProps = {
  type: TalentType;
  talentValues: TalentValue[];
};

class TalentBlock extends React.Component<TalentBlockProps> {
  render() {
    return (
      <div className='sub-block'>
        <h3>{capitalize(this.props.type)}</h3>
        {this.props.talentValues.map(({ description, damage }) => (
          <p key={description}>
            {talentDescMapping[description]}: {getDamageDisplayValue(damage)}
          </p>
        ))}
      </div>
    );
  }
}
export default TalentBlock;
