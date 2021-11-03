import React from 'react';
import { AppState } from '../App';
import InputBlock from './InputBlock';
import InputRow from './InputRow';
import IntInput from './IntInput';

type TalentInputBlockProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
  }: {
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
  }) => void;
  talentAttackLevelExtra: number;
  talentSkillLevelExtra: number;
  talentBurstLevelExtra: number;
};

class TalentInputBlock extends React.Component<TalentInputBlockProps> {
  setTalentAttackLevel = (level: number) => {
    this.props.updateTotalStats({ talentAttackLevel: level });
    this.props.setAppState({ talentAttackLevel: level });
  };

  setTalentSkillLevel = (level: number) => {
    this.props.updateTotalStats({ talentSkillLevel: level });
    this.props.setAppState({ talentSkillLevel: level });
  };

  setTalentBurstLevel = (level: number) => {
    this.props.updateTotalStats({ talentBurstLevel: level });
    this.props.setAppState({ talentBurstLevel: level });
  };

  render() {
    const { appState } = this.props;
    return (
      <InputBlock>
        <InputRow>
          <IntInput
            id='talent-attack-level-input'
            label='Attack Talent Level:'
            defaultValue={1}
            value={appState.talentAttackLevel}
            onInput={this.setTalentAttackLevel}
            className='level-input'
          />
          {this.props.talentAttackLevelExtra > 0 &&
            `+${this.props.talentAttackLevelExtra}`}
        </InputRow>
        <InputRow>
          <IntInput
            id='talent-skill-level-input'
            label='Skill Talent Level:'
            defaultValue={1}
            value={appState.talentSkillLevel}
            onInput={this.setTalentSkillLevel}
            className='level-input'
          />
          {this.props.talentSkillLevelExtra > 0 &&
            `+${this.props.talentSkillLevelExtra}`}
        </InputRow>
        <InputRow>
          <IntInput
            id='talent-burst-level-input'
            label='Burst Talent Level:'
            defaultValue={1}
            value={appState.talentBurstLevel}
            onInput={this.setTalentBurstLevel}
            className='level-input'
          />
          {this.props.talentBurstLevelExtra > 0 &&
            `+${this.props.talentBurstLevelExtra}`}
        </InputRow>
      </InputBlock>
    );
  }
}

export default TalentInputBlock;
