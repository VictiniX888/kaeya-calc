import React, { Fragment } from 'react';
import { AppState } from '../App';
import { initCharacter } from '../character/CharacterUtil';
import CharacterOption from '../option/characterOptions/CharacterOption';
import CharacterPicker from './CharacterPicker';
import InputBlock from './InputBlock';
import InputRow from './InputRow';
import OptionInput from './OptionInput';

type TeamInputBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({
    teamOptions,
  }: {
    teamOptions?: CharacterOption[];
  }) => void;
};

class TeamInputBlock extends React.Component<TeamInputBlockProps> {
  setCharacterId = (i: number) => (id: string) => {
    const { teamCharacters } = this.props.appState;
    teamCharacters[i] = initCharacter(id);
    const teamOptions = teamCharacters.flatMap(
      (character) => character.teamOptions
    );
    this.props.updateTotalStats({ teamOptions });
    this.props.setAppState({
      teamCharacters: [...teamCharacters],
      teamOptions,
    });
  };

  updateOptions = () => {
    const { teamOptions } = this.props.appState;
    this.props.updateTotalStats({ teamOptions });
    this.props.setAppState({ teamOptions: [...teamOptions] });
  };

  render() {
    const { teamCharacters, teamOptions } = this.props.appState;

    return (
      <InputBlock>
        <InputRow>
          <p>Team Buffs</p>
        </InputRow>

        {[0, 1, 2].map((i) => (
          <Fragment key={i}>
            <InputRow>
              <CharacterPicker
                characterId={teamCharacters[i].id}
                setCharacterId={this.setCharacterId(i)}
              />
            </InputRow>

            {teamCharacters[i].teamOptions.map((option) => (
              <InputRow key={option.id}>
                <OptionInput
                  option={option}
                  updateOptions={this.updateOptions}
                />
              </InputRow>
            ))}
          </Fragment>
        ))}
      </InputBlock>
    );
  }
}

export default TeamInputBlock;
