import React from 'react';
import './App.css';
import ArtifactColumn from './component/ArtifactColumn';
import Column from './component/Column';
import InputColumn from './component/InputColumn';
import StatColumn from './component/StatColumn';
import TalentColumn from './component/TalentColumn';
import { Stats } from './data/types';
import Artifact from './js/artifact/Artifact';
import ArtifactSet from './js/artifact/ArtifactSet';
import { ArtifactType } from './js/artifact/types';
import Character from './js/character/Character';
import CritType from './js/modifier/CritType';
import DamageModifier from './js/modifier/DamageModifer';
import { isModifierApplicable, isStatsApplicable } from './js/option';
import { ArtifactSetOption } from './js/option/artifactSetOptions';
import { CharacterOption } from './js/option/characterOptions';
import Resistance from './js/Resistance';
import { getTotalStatsAt } from './js/Stat';
import { TalentType, TalentValueSet } from './js/talent/types';
import Weapon from './js/weapon/Weapon';

export type AppState = {
  character: Character;
  weapon: Weapon;
  artifacts: Artifact[];

  artifactSets: ArtifactSet[];

  enemyLevel: number;
  enemyDefReduction: number;
  enemyRes: Resistance;
  critType: CritType;
  flatDmg: number;
  reaction: string;
  talentAttackLevel: number;
  talentSkillLevel: number;
  talentBurstLevel: number;

  characterOptions: CharacterOption[];
  artifactSetOptions: ArtifactSetOption[];
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    character: new Character('', 1, false),
    weapon: new Weapon('', 1, false),
    artifacts: Object.values(ArtifactType).map((type) => new Artifact(type)),

    artifactSets: [
      new ArtifactSet(''),
      new ArtifactSet(''),
      new ArtifactSet(''),
    ],

    enemyLevel: 1,
    enemyDefReduction: 0,
    enemyRes: new Resistance(),
    critType: CritType.None,
    flatDmg: 0,
    reaction: 'none',
    talentAttackLevel: 1,
    talentSkillLevel: 1,
    talentBurstLevel: 1,

    characterOptions: [],
    artifactSetOptions: [],
  };

  artifactSetBonuses: Stats = {};
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
    characterOptions,
    artifactSetOptions,
  }: {
    characterLevel?: number;
    enemyLevel?: number;
    enemyRes?: Resistance;
    critType?: CritType;
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
    characterOptions?: CharacterOption[];
    artifactSetOptions?: ArtifactSetOption[];
  } = {}): DamageModifier {
    const modifier: DamageModifier = {
      characterLevel: characterLevel ?? this.state.character.level,
      enemyLevel: enemyLevel ?? this.state.enemyLevel,
      enemyDefReduction: this.state.enemyDefReduction,
      enemyRes: enemyRes ?? this.state.enemyRes,
      enemyResReduction: new Resistance(),
      critType: critType ?? this.state.critType,
      flatDmg: this.state.flatDmg,
      reaction: this.state.reaction,
      talentAttackLevel: talentAttackLevel ?? this.state.talentAttackLevel,
      talentSkillLevel: talentSkillLevel ?? this.state.talentSkillLevel,
      talentBurstLevel: talentBurstLevel ?? this.state.talentBurstLevel,
    };

    (characterOptions ?? this.state.characterOptions).forEach((option) => {
      if (isModifierApplicable(option)) {
        option.applyOnModifier(modifier);
      }
    });

    (artifactSetOptions ?? this.state.artifactSetOptions).forEach((option) => {
      if (isModifierApplicable(option)) {
        option.applyOnModifier(modifier);
      }
    });

    return modifier;
  }

  setAppState = <K extends keyof AppState>(
    state: Pick<AppState, K>,
    callback?: () => void
  ) => {
    this.setState(state, callback);
  };

  updateArtifactSetBonuses = ({
    artifactSets,
    artifactSetOptions,
  }: {
    artifactSets?: ArtifactSet[];
    artifactSetOptions?: ArtifactSetOption[];
  }) => {
    const newArtifactSets = artifactSets ?? this.state.artifactSets;
    this.artifactSetBonuses = newArtifactSets
      .map((artifactSet) => artifactSet.stats)
      .reduce((acc, stats) => {
        Object.entries(stats).forEach(([stat, value]) => {
          acc[stat] = value + (acc[stat] ?? 0);
        });
        return acc;
      }, {} as Stats);

    (artifactSetOptions ?? this.state.artifactSetOptions).forEach((option) => {
      if (isStatsApplicable(option)) {
        // Placeholder talent levels, currently no artifactsetoption uses it
        option.applyOnStats(this.artifactSetBonuses, 1, 1, 1);
      }
    });

    this.updateTotalStats({
      artifactSetBonuses: this.artifactSetBonuses,
      artifactSetOptions,
    });
  };

  updateTotalStats = ({
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
  }) => {
    this.totalStats = getTotalStatsAt(
      character ?? this.state.character,
      weapon ?? this.state.weapon,
      artifactSetBonuses ?? this.artifactSetBonuses,
      artifacts ?? this.state.artifacts,
      characterOptions ?? this.state.characterOptions,
      talentAttackLevel ?? this.state.talentAttackLevel,
      talentSkillLevel ?? this.state.talentSkillLevel,
      talentBurstLevel ?? this.state.talentBurstLevel
    );

    this.updateTalentValues({
      character,
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
      characterOptions,
      artifactSetOptions,
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
      characterOptions,
      artifactSetOptions,
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
          updateArtifactSetBonuses={this.updateArtifactSetBonuses}
          updateTotalStats={this.updateTotalStats}
          updateTalentValues={this.updateTalentValues}
        />
        <ArtifactColumn
          appState={this.state}
          setAppState={this.setAppState}
          updateTotalStats={this.updateTotalStats}
        />
        <StatColumn
          appState={this.state}
          totalStats={this.totalStats}
          artifactSetBonuses={this.artifactSetBonuses}
        />
        <TalentColumn talentValues={this.talentValues} />
        <Column></Column>
      </div>
    );
  }
}

export default App;
