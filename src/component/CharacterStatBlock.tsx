import React from 'react';
import Character from '../js/Character';
import * as data from '../js/Data';
import * as statUtil from '../js/Stat';

type CharacterStatBlockProps = {
  character: Character;
};

class CharacterStatBlock extends React.Component<CharacterStatBlockProps> {
  render() {
    const character = this.props.character;

    if (!character.isDefined()) {
      return null;
    }

    return (
      <div className='result-block'>
        <h2>Character</h2>
        <img
          src={`https://rerollcdn.com/GENSHIN/Characters/${character.name}.png`}
          width={70}
          height={70}
          alt='Character thumbnail'
        />
        <p>{character.name ?? ''}</p>
        {Object.entries(character.innateStats).map(([prop, value]) => (
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

export default CharacterStatBlock;
