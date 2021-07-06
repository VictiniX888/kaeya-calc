import React from 'react';
import './App.css';
import ArtifactColumn from './component/ArtifactColumn';
import Column from './component/Column';
import InputColumn from './component/InputColumn';
import StatColumn from './component/StatColumn';
import TalentColumn from './component/TalentColumn';
import { Stats } from './data/types';
import Artifact from './js/artifact/Artifact';
import { ArtifactType } from './js/artifact/types';
import Character from './js/Character';
import CritType from './js/modifier/CritType';
import DamageModifier from './js/modifier/DamageModifer';
import Resistance from './js/Resistance';
import { getTotalStatsAt } from './js/Stat';
import { TalentType, TalentValueSet } from './js/talent/types';
import Weapon from './js/weapon/Weapon';

export type AppState = {
  character: Character;
  weapon: Weapon;
  artifacts: Artifact[];

  enemyLevel: number;
  enemyDefReduction: number;
  enemyRes: Resistance;
  enemyResReduction: Resistance;
  critType: CritType;
  flatDmg: number;
  reaction: string;
  talentAttackLevel: number;
  talentSkillLevel: number;
  talentBurstLevel: number;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    character: new Character('', 1, false),
    weapon: new Weapon('', 1, false),
    artifacts: Object.values(ArtifactType).map((type) => new Artifact(type)),

    enemyLevel: 1,
    enemyDefReduction: 0,
    enemyRes: new Resistance(),
    enemyResReduction: new Resistance(),
    critType: CritType.None,
    flatDmg: 0,
    reaction: 'none',
    talentAttackLevel: 1,
    talentSkillLevel: 1,
    talentBurstLevel: 1,
  };

  totalStats: Stats = {};
  talentValues: TalentValueSet = { attack: [], skill: [], burst: [] };

  getDamageModifier({
    characterLevel,
    enemyLevel,
    enemyRes,
    critType,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
  }: {
    characterLevel?: number;
    enemyLevel?: number;
    enemyRes?: Resistance;
    critType?: CritType;
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
  } = {}): DamageModifier {
    return {
      characterLevel: characterLevel ?? this.state.character.level,
      enemyLevel: enemyLevel ?? this.state.enemyLevel,
      enemyDefReduction: this.state.enemyDefReduction,
      enemyRes: enemyRes ?? this.state.enemyRes,
      enemyResReduction: this.state.enemyResReduction,
      critType: critType ?? this.state.critType,
      flatDmg: this.state.flatDmg,
      reaction: this.state.reaction,
      talentAttackLevel: talentAttackLevel ?? this.state.talentAttackLevel,
      talentSkillLevel: talentSkillLevel ?? this.state.talentSkillLevel,
      talentBurstLevel: talentBurstLevel ?? this.state.talentBurstLevel,
    };
  }

  setAppState = <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => {
    this.setState(state, callback);
  };

  updateTotalStats = ({
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
  }) => {
    this.totalStats = getTotalStatsAt(
      character ?? this.state.character,
      weapon ?? this.state.weapon,
      {}, // Temp
      artifacts ?? this.state.artifacts,
      [], // Temp
      talentAttackLevel ?? this.state.talentAttackLevel,
      talentSkillLevel ?? this.state.talentSkillLevel,
      talentBurstLevel ?? this.state.talentBurstLevel
    );

    this.updateTalentValues({
      character,
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
    });
  };

  updateTalentValues = ({
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
  }) => {
    const character = newChar ?? this.state.character;
    const damageModifer = this.getDamageModifier({
      characterLevel: newChar?.level,
      enemyLevel,
      enemyRes,
      critType,
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
    });

    this.talentValues.attack = character.getTalentDamageAt({
      type: TalentType.Attack,
      talentLevel: talentAttackLevel ?? this.state.talentAttackLevel,
      totalStats: this.totalStats,
      modifier: damageModifer,
    });
    this.talentValues.skill = character.getTalentDamageAt({
      type: TalentType.Skill,
      talentLevel: talentSkillLevel ?? this.state.talentSkillLevel,
      totalStats: this.totalStats,
      modifier: damageModifer,
    });
    this.talentValues.burst = character.getTalentDamageAt({
      type: TalentType.Burst,
      talentLevel: talentBurstLevel ?? this.state.talentBurstLevel,
      totalStats: this.totalStats,
      modifier: damageModifer,
    });
  };

  render() {
    return (
      <div className='app'>
        <InputColumn
          appState={this.state}
          setAppState={this.setAppState}
          updateTotalStats={this.updateTotalStats}
          updateTalentValues={this.updateTalentValues}
        />
        <ArtifactColumn
          appState={this.state}
          setAppState={this.setAppState}
          updateTotalStats={this.updateTotalStats}
        />
        <StatColumn appState={this.state} totalStats={this.totalStats} />
        <TalentColumn talentValues={this.talentValues} />
        <Column></Column>
      </div>
    );
  }
}

export default App;
