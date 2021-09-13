import React from 'react';
import Container from 'react-bootstrap/esm/Container';
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
import Reaction from './js/modifier/Reaction';
import { isModifierApplicable, isStatsApplicable } from './js/option';
import { ArtifactSetOption } from './js/option/artifactSetOptions';
import { CharacterOption } from './js/option/characterOptions';
import { ModifierMixin, StatMixin } from './js/option/Mixin';
import { IModifierApplicable, IStatsApplicable } from './js/option/Option';
import WeaponOption from './js/option/weaponOptions/WeaponOption';
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
  reaction: Reaction;
  talentAttackLevel: number;
  talentSkillLevel: number;
  talentBurstLevel: number;

  characterOptions: CharacterOption[];
  weaponOptions: WeaponOption[];
  artifactSetOptions: ArtifactSetOption[];
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    character: new Character('', 1, false),
    weapon: new Weapon('', 1, false, 1),
    artifacts: Object.values(ArtifactType).map(
      (type) => new Artifact(type, 1, 0, '')
    ),

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
    reaction: Reaction.None,
    talentAttackLevel: 1,
    talentSkillLevel: 1,
    talentBurstLevel: 1,

    characterOptions: [],
    weaponOptions: [],
    artifactSetOptions: [],
  };

  artifactSetBonuses: Stats = {};
  totalStats: Stats = {};
  talentValues: TalentValueSet = { attack: [], skill: [], burst: [] };

  modifierMixins: ModifierMixin[] = [];
  statMixins: StatMixin[] = [];

  // Gets all modifier mixins and updates cache (modifierMixins)
  getModifierMixins({
    character,
    characterOptions,
    weapon,
    weaponOptions,
    artifactSets,
    artifactSetOptions,
  }: {
    character?: Character;
    characterOptions?: CharacterOption[];
    weapon?: Weapon;
    weaponOptions?: WeaponOption[];
    artifactSets?: ArtifactSet[];
    artifactSetOptions?: ArtifactSetOption[];
  }) {
    if (
      character === undefined &&
      characterOptions === undefined &&
      weapon === undefined &&
      weaponOptions === undefined &&
      artifactSets === undefined &&
      artifactSetOptions === undefined
    ) {
      return this.modifierMixins;
    }

    const characterPassiveMixins = (
      character ?? this.state.character
    ).getPassiveModifierMixins();

    const weaponPassiveMixins = (
      weapon ?? this.state.weapon
    ).getPassiveModifierMixins();

    const artifactSetMixins = (artifactSets ?? this.state.artifactSets).flatMap(
      (artifactSet) => artifactSet.getModifierMixins()
    );

    const characterOptionMixins = (
      characterOptions ?? this.state.characterOptions
    )
      .filter((option): option is CharacterOption & IModifierApplicable =>
        isModifierApplicable(option)
      )
      .map((option) => option.applyOnModifier);

    const weaponOptionMixins = (weaponOptions ?? this.state.weaponOptions)
      .filter((option): option is WeaponOption & IModifierApplicable =>
        isModifierApplicable(option)
      )
      .map((option) => option.applyOnModifier);

    const artifactSetOptionMixins = (
      artifactSetOptions ?? this.state.artifactSetOptions
    )
      .filter((option): option is ArtifactSetOption & IModifierApplicable =>
        isModifierApplicable(option)
      )
      .map((option) => option.applyOnModifier);

    this.modifierMixins = characterPassiveMixins
      .concat(weaponPassiveMixins)
      .concat(artifactSetMixins)
      .concat(characterOptionMixins)
      .concat(weaponOptionMixins)
      .concat(artifactSetOptionMixins);

    return this.modifierMixins;
  }

  // Gets all stat mixins and updates cache (statMixins)
  getStatMixins({
    character,
    characterOptions,
    weapon,
    weaponOptions,
    artifactSets,
    artifactSetOptions,
  }: {
    character?: Character;
    characterOptions?: CharacterOption[];
    weapon?: Weapon;
    weaponOptions?: WeaponOption[];
    artifactSets?: ArtifactSet[];
    artifactSetOptions?: ArtifactSetOption[];
  }) {
    if (
      character === undefined &&
      characterOptions === undefined &&
      weapon === undefined &&
      weaponOptions === undefined &&
      artifactSets === undefined &&
      artifactSetOptions === undefined
    ) {
      return this.statMixins;
    }

    const characterPassiveMixins = (
      character ?? this.state.character
    ).getPassiveStatMixins();

    const weaponPassiveMixins = (
      weapon ?? this.state.weapon
    ).getPassiveStatMixins();

    const artifactSetMixins = (artifactSets ?? this.state.artifactSets).flatMap(
      (artifactSet) => artifactSet.getStatMixins()
    );

    const characterOptionMixins = (
      characterOptions ?? this.state.characterOptions
    )
      .filter((option): option is CharacterOption & IStatsApplicable =>
        isStatsApplicable(option)
      )
      .map((option) => option.applyOnStats);

    const weaponOptionMixins = (weaponOptions ?? this.state.weaponOptions)
      .filter((option): option is WeaponOption & IStatsApplicable =>
        isModifierApplicable(option)
      )
      .map((option) => option.applyOnStats);

    const artifactSetOptionMixins = (
      artifactSetOptions ?? this.state.artifactSetOptions
    )
      .filter((option): option is ArtifactSetOption & IStatsApplicable =>
        isStatsApplicable(option)
      )
      .map((option) => option.applyOnStats);

    this.statMixins = characterPassiveMixins
      .concat(weaponPassiveMixins)
      .concat(artifactSetMixins)
      .concat(characterOptionMixins)
      .concat(weaponOptionMixins)
      .concat(artifactSetOptionMixins);

    return this.statMixins;
  }

  getDamageModifier({
    characterLevel,
    enemyLevel,
    enemyRes,
    critType,
    reaction,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    modifierMixins,
  }: {
    characterLevel?: number;
    enemyLevel?: number;
    enemyRes?: Resistance;
    critType?: CritType;
    reaction?: Reaction;
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
    modifierMixins?: ModifierMixin[];
  } = {}): DamageModifier {
    const modifier: DamageModifier = {
      characterLevel: characterLevel ?? this.state.character.level,
      enemyLevel: enemyLevel ?? this.state.enemyLevel,
      enemyDefReduction: this.state.enemyDefReduction,
      enemyRes: enemyRes ?? this.state.enemyRes,
      enemyResReduction: new Resistance(),
      critType: critType ?? this.state.critType,
      flatDmg: this.state.flatDmg,
      reaction: reaction ?? this.state.reaction,
      talentAttackLevel: talentAttackLevel ?? this.state.talentAttackLevel,
      talentSkillLevel: talentSkillLevel ?? this.state.talentSkillLevel,
      talentBurstLevel: talentBurstLevel ?? this.state.talentBurstLevel,
    };

    // Apply modifier mixins
    modifierMixins?.forEach((mixin) => mixin(modifier));

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

    this.updateTotalStats({
      artifactSets,
      artifactSetBonuses: this.artifactSetBonuses,
      artifactSetOptions,
    });
  };

  updateTotalStats = ({
    character,
    weapon,
    artifacts,
    artifactSets,
    artifactSetBonuses,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    characterOptions,
    weaponOptions,
    artifactSetOptions,
  }: {
    character?: Character;
    weapon?: Weapon;
    artifacts?: Artifact[];
    artifactSets?: ArtifactSet[];
    artifactSetBonuses?: Stats;
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
    characterOptions?: CharacterOption[];
    weaponOptions?: WeaponOption[];
    artifactSetOptions?: ArtifactSetOption[];
  }) => {
    const statMixins = this.getStatMixins({
      character,
      characterOptions,
      weapon,
      weaponOptions,
      artifactSets,
      artifactSetOptions,
    });

    this.totalStats = getTotalStatsAt(
      character ?? this.state.character,
      weapon ?? this.state.weapon,
      artifactSetBonuses ?? this.artifactSetBonuses,
      artifacts ?? this.state.artifacts,
      talentAttackLevel ?? this.state.talentAttackLevel,
      talentSkillLevel ?? this.state.talentSkillLevel,
      talentBurstLevel ?? this.state.talentBurstLevel,
      statMixins
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
    weapon,
    artifactSets,
    talentAttackLevel,
    talentSkillLevel,
    talentBurstLevel,
    enemyLevel,
    enemyRes,
    critType,
    reaction,
    characterOptions,
    weaponOptions,
    artifactSetOptions,
  }: {
    character?: Character;
    weapon?: Weapon;
    artifactSets?: ArtifactSet[];
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
    enemyLevel?: number;
    enemyRes?: Resistance;
    critType?: CritType;
    reaction?: Reaction;
    characterOptions?: CharacterOption[];
    weaponOptions?: WeaponOption[];
    artifactSetOptions?: ArtifactSetOption[];
  }) => {
    const character = newChar ?? this.state.character;

    const modifierMixins = this.getModifierMixins({
      character,
      characterOptions,
      weapon,
      weaponOptions,
      artifactSets,
      artifactSetOptions,
    });

    const damageModifer = this.getDamageModifier({
      characterLevel: newChar?.level,
      enemyLevel,
      enemyRes,
      critType,
      reaction,
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
      modifierMixins,
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

  refreshApp = () => {
    this.getStatMixins({
      character: this.state.character,
      characterOptions: this.state.characterOptions,
      weapon: this.state.weapon,
      weaponOptions: this.state.weaponOptions,
      artifactSets: this.state.artifactSets,
      artifactSetOptions: this.state.artifactSetOptions,
    });
    this.getModifierMixins({
      character: this.state.character,
      characterOptions: this.state.characterOptions,
      weapon: this.state.weapon,
      weaponOptions: this.state.weaponOptions,
      artifactSets: this.state.artifactSets,
      artifactSetOptions: this.state.artifactSetOptions,
    });

    this.updateArtifactSetBonuses({});
    this.setState({});
  };

  render() {
    return (
      <Container className='app px-0' fluid>
        <InputColumn
          appState={this.state}
          setAppState={this.setAppState}
          updateArtifactSetBonuses={this.updateArtifactSetBonuses}
          updateTotalStats={this.updateTotalStats}
          updateTalentValues={this.updateTalentValues}
          refreshApp={this.refreshApp}
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
      </Container>
    );
  }
}

export default App;
