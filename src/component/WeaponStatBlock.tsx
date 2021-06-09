import React from 'react';
import Weapon from '../js/weapon/Weapon';
import * as data from '../js/Data';
import * as statUtil from '../js/Stat';

type WeaponStatBlockProps = {
  weapon: Weapon;
};

class WeaponStatBlock extends React.Component<WeaponStatBlockProps> {
  render() {
    const weapon = this.props.weapon;

    if (!weapon.isDefined()) {
      return null;
    }

    return (
      <div className='result-block'>
        <h2>Weapon</h2>
        <p>{weapon.name ?? ''}</p>
        {Object.entries(weapon.stats).map(([prop, value]) => (
          <p key={prop}>
            {data.propMapping[prop].name}:{' '}
            {statUtil.getStatDisplayValue(
              value,
              data.propMapping[prop].isPercentage
            )}
          </p>
        ))}
      </div>
    );
  }
}

export default WeaponStatBlock;
