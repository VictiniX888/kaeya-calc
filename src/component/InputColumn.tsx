import React from 'react';
import { AppState } from '../App';
import Artifact from '../js/artifact/Artifact';
import Character from '../js/Character';
import CritType from '../js/modifier/CritType';
import Resistance from '../js/Resistance';
import Weapon from '../js/weapon/Weapon';
import CharacterInputBlock from './CharacterInputBlock';
import Column from './Column';
import ModifierInputBlock from './ModifierInputBlock';
import TalentInputBlock from './TalentInputBlock';
import WeaponInputBlock from './WeaponInputBlock';

type InputColumnProps = {
  appState: AppState;
  setAppState: <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => void;
  updateTotalStats: ({
    character,
    weapon,
    artifacts,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
  }: {
    character?: Character;
    weapon?: Weapon;
    artifacts?: Artifact[];
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
  }) => void;
  updateTalentValues: ({
    character: newChar,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    enemyLevel,
    enemyRes,
    critType,
  }: {
    character?: Character;
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
    enemyLevel?: number;
    enemyRes?: Resistance;
    critType?: CritType;
  }) => void;
};

class InputColumn extends React.Component<InputColumnProps> {
  render() {
    const { appState, setAppState, updateTotalStats, updateTalentValues } =
      this.props;

    return (
      <Column className='input-column'>
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
