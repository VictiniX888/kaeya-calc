import React, { Fragment } from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import Card from 'react-bootstrap/esm/Card';
import { AppState } from '../App';
import Character from '../character/Character';
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
    teamCharacters,
    teamOptions,
  }: {
    teamCharacters?: Character[];
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
    this.props.updateTotalStats({ teamCharacters, teamOptions });
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
    const { teamCharacters } = this.props.appState;

    return (
      <Accordion>
        <Card className=' optimizer-card bg-transparent border-dark border-left-0 border-right-0 rounded-0'>
          <Accordion.Toggle
            as={Card.Header}
            eventKey='1'
            className='bg-transparent border-0'
          >
            <h3>Team Buffs</h3>
            <p>Click to expand/collapse</p>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey='1'>
            <Card.Body>
              <InputBlock>
                <InputRow>Party Members</InputRow>

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
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default TeamInputBlock;
