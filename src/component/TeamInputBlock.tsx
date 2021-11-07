import React, { Fragment } from 'react';
import Accordion from 'react-bootstrap/esm/Accordion';
import Card from 'react-bootstrap/esm/Card';
import { AppState } from '../App';
import Character from '../character/Character';
import { initCharacter } from '../character/CharacterUtil';
import ArtifactSetOption from '../option/artifactSetOptions/ArtifactSetOption';
import CharacterOption from '../option/characterOptions/CharacterOption';
import artifactTeamBuffs from '../teambuff/artifact/ArtifactTeamBuff';
import CharacterPicker from './CharacterPicker';
import InputBlock from './InputBlock';
import InputRow from './InputRow';
import OptionInput from './OptionInput';
import TeamBuffOptionInput from './TeamBuffOptionInput';

type TeamInputBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({
    teamCharacters,
    teamOptions,
    artifactBuffOptions,
  }: {
    teamCharacters?: Character[];
    teamOptions?: CharacterOption[];
    artifactBuffOptions?: ArtifactSetOption[];
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

  updateTeamOptions = () => {
    const { teamOptions } = this.props.appState;
    this.props.updateTotalStats({ teamOptions });
    this.props.setAppState({ teamOptions: [...teamOptions] });
  };

  setArtifactBuffOption = (i: number) => (option?: ArtifactSetOption) => {
    const options = [...this.props.appState.artifactBuffOptions];

    if (option === undefined) {
      options.splice(i, 1);
    } else {
      options[i] = option;
    }

    this.props.updateTotalStats({ artifactBuffOptions: options });
    this.props.setAppState({ artifactBuffOptions: options });
  };

  render() {
    const { teamCharacters, artifactBuffOptions } = this.props.appState;

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
                          updateOptions={this.updateTeamOptions}
                        />
                      </InputRow>
                    ))}
                  </Fragment>
                ))}
              </InputBlock>

              <InputBlock>
                <InputRow>Artifact Buffs</InputRow>

                {artifactBuffOptions.map((option, i) => (
                  <TeamBuffOptionInput
                    key={i}
                    setOption={this.setArtifactBuffOption(i)}
                    options={artifactTeamBuffs}
                    option={option}
                    index={i}
                  />
                ))}

                <TeamBuffOptionInput
                  setOption={this.setArtifactBuffOption(
                    artifactBuffOptions.length
                  )}
                  options={artifactTeamBuffs}
                  index={artifactBuffOptions.length}
                />
              </InputBlock>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default TeamInputBlock;
