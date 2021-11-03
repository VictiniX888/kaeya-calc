import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import { AppState } from '../App';
import { Stats } from '../data/types';
import Artifact from '../artifact/Artifact';
import ArtifactSet from '../artifact/ArtifactSet';
import Character from '../character/Character';
import CritType from '../modifier/CritType';
import Resistance from '../stat/Resistance';
import Weapon from '../weapon/Weapon';
import ArtifactSetInputBlock from './ArtifactSetInputBlock';
import CharacterInputBlock from './CharacterInputBlock';
import ModifierInputBlock from './ModifierInputBlock';
import SaveBlock from './SaveBlock';
import TalentInputBlock from './TalentInputBlock';
import WeaponInputBlock from './WeaponInputBlock';
import CharacterOption from '../option/characterOptions/CharacterOption';
import ArtifactSetOption from '../option/artifactSetOptions/ArtifactSetOption';
import TeamInputBlock from './TeamInputBlock';

type InputColumnProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateArtifactSetBonuses: ({
    artifactSets,
  }: {
    artifactSets?: ArtifactSet[];
  }) => void;
  updateTotalStats: ({
    character,
    weapon,
    artifacts,
    artifactSetBonuses,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    characterOptions,
    artifactSetOptions,
    teamOptions,
  }: {
    character?: Character;
    weapon?: Weapon;
    artifacts?: Artifact[];
    artifactSetBonuses?: Stats;
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
    characterOptions?: CharacterOption[];
    artifactSetOptions?: ArtifactSetOption[];
    teamOptions?: CharacterOption[];
  }) => void;
  updateTalentValues: ({
    character,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    enemyLevel,
    enemyRes,
    critType,
    characterOptions,
    artifactSetOptions,
  }: {
    character?: Character;
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
    enemyLevel?: number;
    enemyRes?: Resistance;
    critType?: CritType;
    characterOptions?: CharacterOption[];
    artifactSetOptions?: ArtifactSetOption[];
  }) => void;
  refreshApp: () => void;
  talentAttackLevelExtra: number;
  talentSkillLevelExtra: number;
  talentBurstLevelExtra: number;
};

class InputColumn extends React.Component<InputColumnProps> {
  render() {
    const {
      appState,
      setAppState,
      updateArtifactSetBonuses,
      updateTotalStats,
      updateTalentValues,
      refreshApp,
    } = this.props;

    return (
      <Col
        id='input-column'
        className='input-column no-gutters border-right border-dark'
        md='auto'
        xs={12}
      >
        <SaveBlock
          appState={appState}
          setAppState={setAppState}
          refreshApp={refreshApp}
        />

        <CharacterInputBlock
          appState={appState}
          setAppState={setAppState}
          updateTotalStats={updateTotalStats}
        />

        <WeaponInputBlock
          appState={appState}
          setAppState={setAppState}
          updateTotalStats={updateTotalStats}
        />

        <ArtifactSetInputBlock
          appState={appState}
          setAppState={setAppState}
          updateArtifactSetBonuses={updateArtifactSetBonuses}
        />

        <TalentInputBlock
          appState={appState}
          setAppState={setAppState}
          updateTotalStats={updateTotalStats}
          talentAttackLevelExtra={this.props.talentAttackLevelExtra}
          talentSkillLevelExtra={this.props.talentSkillLevelExtra}
          talentBurstLevelExtra={this.props.talentBurstLevelExtra}
        />

        <ModifierInputBlock
          appState={appState}
          setAppState={setAppState}
          updateTalentValues={updateTalentValues}
        />

        <TeamInputBlock
          appState={appState}
          setAppState={setAppState}
          updateTotalStats={updateTotalStats}
        />
      </Col>
    );
  }
}

export default InputColumn;
