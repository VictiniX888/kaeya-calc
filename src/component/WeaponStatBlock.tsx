import React from 'react';
import { propMapping } from '../data/Data';
import { getStatDisplayValue } from '../stat/Stat';
import Weapon from '../weapon/Weapon';

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
            {propMapping[prop].name}: {getStatDisplayValue(prop, value)}
          </p>
        ))}
      </div>
    );
  }
}

export default WeaponStatBlock;
