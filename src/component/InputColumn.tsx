import React from 'react';
import { AppState } from '../App';
import { Stats } from '../data/types';
import Artifact from '../js/artifact/Artifact';
import ArtifactSet from '../js/artifact/ArtifactSet';
import Character from '../js/character/Character';
import CritType from '../js/modifier/CritType';
import { ArtifactSetOption } from '../js/option/artifactSetOptions';
import { CharacterOption } from '../js/option/characterOptions';
import Resistance from '../js/Resistance';
import Weapon from '../js/weapon/Weapon';
import ArtifactSetInputBlock from './ArtifactSetInputBlock';
import CharacterInputBlock from './CharacterInputBlock';
import Column from './Column';
import ModifierInputBlock from './ModifierInputBlock';
import SaveBlock from './SaveBlock';
import TalentInputBlock from './TalentInputBlock';
import WeaponInputBlock from './WeaponInputBlock';

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
      <Column className='input-column'>
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
        />

        <ModifierInputBlock
          appState={appState}
          setAppState={setAppState}
          updateTalentValues={updateTalentValues}
        />
      </Column>
    );
  }
}

export default InputColumn;
