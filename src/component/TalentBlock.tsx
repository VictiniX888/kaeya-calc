import React from 'react';
import { talentDescMapping } from '../js/Data';
import { getDamageDisplayValue } from '../js/Stat';
import { TalentValue } from '../js/talent/types';

type TalentBlockProps = {
  type: string;
  talentValues: Record<string, TalentValue>;
};

class TalentBlock extends React.Component<TalentBlockProps> {
  render() {
    return (
      <div className='sub-block'>
        <h3>{talentDescMapping[this.props.type]}</h3>
        {Object.entries(this.props.talentValues).map(([id, { damage }]) => (
          <p key={id}>
            {talentDescMapping[id]}: {getDamageDisplayValue(damage)}
          </p>
        ))}
      </div>
    );
  }
}
export default TalentBlock;
