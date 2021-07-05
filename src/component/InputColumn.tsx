import React from 'react';
import { AppState } from '../App';
import Character from '../js/Character';
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
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
  }: {
    character?: Character;
    weapon?: Weapon;
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
  }) => void;
  updateTalentValues: ({ enemyRes }: { enemyRes?: Resistance }) => void;
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
