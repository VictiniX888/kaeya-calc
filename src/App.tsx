import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import Row from 'react-bootstrap/esm/Row';
import './App.css';
import Artifact from './artifact/Artifact';
import ArtifactSet from './artifact/ArtifactSet';
import { initArtifactSet } from './artifact/ArtifactSetUtil';
import { ArtifactType } from './artifact/types';
import Character from './character/Character';
import { initCharacter } from './character/CharacterUtil';
import ArtifactColumn from './component/ArtifactColumn';
import DPSColumn, { Attack } from './component/DPSColumn';
import InputColumn from './component/InputColumn';
import StatColumn from './component/StatColumn';
import TalentColumn from './component/TalentColumn';
import { Stats } from './data/types';
import CritType from './modifier/CritType';
import DamageModifier from './modifier/DamageModifer';
import Reaction from './modifier/Reaction';
import { isModifierApplicable, isStatsApplicable } from './option';
import ArtifactSetOption from './option/artifactSetOptions/ArtifactSetOption';
import CharacterOption from './option/characterOptions/CharacterOption';
import { ModifierMixin, Priority, StatMixin } from './option/Mixin';
import { IModifierApplicable, IStatsApplicable } from './option/Option';
import WeaponOption from './option/weaponOptions/WeaponOption';
import Resistance from './stat/Resistance';
import { getTotalStatsAt } from './stat/Stat';
import { TalentValue, TalentValueSet } from './talent/types';
import Weapon from './weapon/Weapon';
import { initWeapon } from './weapon/WeaponUtil';

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

  teamCharacters: Character[];

  characterOptions: CharacterOption[];
  weaponOptions: WeaponOption[];
  artifactSetOptions: ArtifactSetOption[];
  teamOptions: CharacterOption[];
  artifactBuffOptions: ArtifactSetOption[];

  rotationTime: number;
  rotation: Attack[];
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    character: initCharacter(),
    weapon: initWeapon(),
    artifacts: Object.values(ArtifactType).map(
      (type) => new Artifact(type, 1, 0, '')
    ),

    artifactSets: [initArtifactSet(), initArtifactSet(), initArtifactSet()],

    enemyLevel: 1,
    enemyDefReduction: 0,
    enemyRes: new Resistance(),
    critType: CritType.None,
    flatDmg: 0,
    reaction: Reaction.None,
    talentAttackLevel: 1,
    talentSkillLevel: 1,
    talentBurstLevel: 1,

    teamCharacters: [initCharacter(), initCharacter(), initCharacter()],

    characterOptions: [],
    weaponOptions: [],
    artifactSetOptions: [],
    teamOptions: [],
    artifactBuffOptions: [],

    rotationTime: 0,
    rotation: [],
  };

  artifactSetBonuses: Stats = {};
  totalStats: Stats = {};
  talentValues: TalentValueSet = {};

  modifierMixins: ModifierMixin[] = [];
  statMixins: StatMixin[] = [];

  talentAttackLevelExtra: number = 0;
  talentSkillLevelExtra: number = 0;
  talentBurstLevelExtra: number = 0;

  // Gets all modifier mixins and updates cache (modifierMixins)
  getModifierMixins: GetModifierMixinsFn = ({
    character,
    characterOptions,
    weapon,
    weaponOptions,
    artifactSets,
    artifactSetOptions,
    teamCharacters,
    teamOptions,
    artifactBuffOptions,
    updateCache = true,
  }: {
    character?: Character;
    characterOptions?: CharacterOption[];
    weapon?: Weapon;
    weaponOptions?: WeaponOption[];
    artifactSets?: ArtifactSet[];
    artifactSetOptions?: ArtifactSetOption[];
    teamCharacters?: Character[];
    teamOptions?: CharacterOption[];
    artifactBuffOptions?: ArtifactSetOption[];
    updateCache?: boolean;
  } = {}) => {
    if (
      character === undefined &&
      characterOptions === undefined &&
      weapon === undefined &&
      weaponOptions === undefined &&
      artifactSets === undefined &&
      artifactSetOptions === undefined &&
      teamOptions === undefined &&
      artifactBuffOptions === undefined
    ) {
      return this.modifierMixins;
    }

    const characterPassiveMixins = (
      character ?? this.state.character
    ).getPassiveModifierMixins();

    const characterConstellationMixins = (
      character ?? this.state.character
    ).getConstellationModifierMixins();

    const weaponPassiveMixins = (
      weapon ?? this.state.weapon
    ).getPassiveModifierMixins();

    const artifactSetMixins = (artifactSets ?? this.state.artifactSets).flatMap(
      (artifactSet) => artifactSet.getModifierMixins()
    );

    const teamPassiveMixins = (teamCharacters ?? this.state.teamCharacters)
      .map((character) => character.getTeamModifierMixin())
      .filter((mixin): mixin is ModifierMixin => mixin !== undefined);

    const characterOptionMixins = (
      characterOptions ?? this.state.characterOptions
    )
      .filter((option): option is CharacterOption & IModifierApplicable =>
        isModifierApplicable(option)
      )
      .map((option) => option.modifierMixin);

    const weaponOptionMixins = (weaponOptions ?? this.state.weaponOptions)
      .filter((option): option is WeaponOption & IModifierApplicable =>
        isModifierApplicable(option)
      )
      .map((option) => option.modifierMixin);

    const artifactSetOptionMixins = (
      artifactSetOptions ?? this.state.artifactSetOptions
    )
      .filter((option): option is ArtifactSetOption & IModifierApplicable =>
        isModifierApplicable(option)
      )
      .map((option) => option.modifierMixin);

    const teamOptionMixins = (teamOptions ?? this.state.teamOptions)
      .filter((option): option is CharacterOption & IModifierApplicable =>
        isModifierApplicable(option)
      )
      .map((option) => option.modifierMixin);

    const artifactBuffOptionMixins = (
      artifactBuffOptions ?? this.state.artifactBuffOptions
    )
      .filter((option): option is ArtifactSetOption & IModifierApplicable =>
        isModifierApplicable(option)
      )
      .map((option) => option.modifierMixin);

    const unarrangedMixins = [
      ...characterPassiveMixins,
      ...characterConstellationMixins,
      ...weaponPassiveMixins,
      ...artifactSetMixins,
      ...teamPassiveMixins,
      ...characterOptionMixins,
      ...weaponOptionMixins,
      ...artifactSetOptionMixins,
      ...teamOptionMixins,
      ...artifactBuffOptionMixins,
    ];
    const groupedMixins = new Map<Priority, ModifierMixin[]>();
    unarrangedMixins.forEach((mixin) => {
      const priority = mixin.priority ?? Priority.Normal;
      const array = groupedMixins.get(priority);
      if (!array) {
        groupedMixins.set(priority, [mixin]);
      } else {
        array.push(mixin);
      }
    });

    const modifierMixins = (groupedMixins.get(Priority.Normal) ?? []).concat(
      groupedMixins.get(Priority.Last) ?? []
    );

    if (updateCache) {
      this.modifierMixins = modifierMixins;
    }

    return modifierMixins;
  };

  // Gets all stat mixins and updates cache (statMixins)
  getStatMixins: GetStatMixinsFn = ({
    character,
    characterOptions,
    weapon,
    weaponOptions,
    artifactSets,
    artifactSetOptions,
    teamCharacters,
    teamOptions,
    artifactBuffOptions,
    updateCache = true,
  }: {
    character?: Character;
    characterOptions?: CharacterOption[];
    weapon?: Weapon;
    weaponOptions?: WeaponOption[];
    artifactSets?: ArtifactSet[];
    artifactSetOptions?: ArtifactSetOption[];
    teamCharacters?: Character[];
    teamOptions?: CharacterOption[];
    artifactBuffOptions?: ArtifactSetOption[];
    updateCache?: boolean;
  } = {}) => {
    if (
      character === undefined &&
      characterOptions === undefined &&
      weapon === undefined &&
      weaponOptions === undefined &&
      artifactSets === undefined &&
      artifactSetOptions === undefined &&
      teamOptions === undefined &&
      artifactBuffOptions === undefined
    ) {
      return this.statMixins;
    }

    const characterPassiveMixins = (
      character ?? this.state.character
    ).getPassiveStatMixins();

    const characterConstellationMixins = (
      character ?? this.state.character
    ).getConstellationStatMixins();

    const weaponPassiveMixins = (
      weapon ?? this.state.weapon
    ).getPassiveStatMixins();

    const artifactSetMixins = (artifactSets ?? this.state.artifactSets).flatMap(
      (artifactSet) => artifactSet.getStatMixins()
    );

    const teamPassiveMixins = (teamCharacters ?? this.state.teamCharacters)
      .map((character) => character.getTeamStatMixin())
      .filter((mixin): mixin is StatMixin => mixin !== undefined);

    const characterOptionMixins = (
      characterOptions ?? this.state.characterOptions
    )
      .filter((option): option is CharacterOption & IStatsApplicable =>
        isStatsApplicable(option)
      )
      .map((option) => option.statMixin);

    const weaponOptionMixins = (weaponOptions ?? this.state.weaponOptions)
      .filter((option): option is WeaponOption & IStatsApplicable =>
        isStatsApplicable(option)
      )
      .map((option) => option.statMixin);

    const artifactSetOptionMixins = (
      artifactSetOptions ?? this.state.artifactSetOptions
    )
      .filter((option): option is ArtifactSetOption & IStatsApplicable =>
        isStatsApplicable(option)
      )
      .map((option) => option.statMixin);

    const teamOptionMixins = (teamOptions ?? this.state.teamOptions)
      .filter((option): option is CharacterOption & IStatsApplicable =>
        isStatsApplicable(option)
      )
      .map((option) => option.statMixin);

    const artifactBuffOptionMixins = (
      artifactBuffOptions ?? this.state.artifactBuffOptions
    )
      .filter((option): option is ArtifactSetOption & IStatsApplicable =>
        isStatsApplicable(option)
      )
      .map((option) => option.statMixin);

    const unarrangedMixins = [
      ...characterPassiveMixins,
      ...characterConstellationMixins,
      ...weaponPassiveMixins,
      ...artifactSetMixins,
      ...teamPassiveMixins,
      ...characterOptionMixins,
      ...weaponOptionMixins,
      ...artifactSetOptionMixins,
      ...teamOptionMixins,
      ...artifactBuffOptionMixins,
    ];
    const groupedMixins = new Map<Priority, StatMixin[]>();
    unarrangedMixins.forEach((mixin) => {
      const priority = mixin.priority ?? Priority.Normal;
      const array = groupedMixins.get(priority);
      if (!array) {
        groupedMixins.set(priority, [mixin]);
      } else {
        array.push(mixin);
      }
    });

    const statMixins = (groupedMixins.get(Priority.Normal) ?? []).concat(
      groupedMixins.get(Priority.Last) ?? []
    );

    if (updateCache) {
      this.statMixins = statMixins;
    }

    return statMixins;
  };

  getDamageModifier: GetDamageModifierFn = ({
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
  } = {}): DamageModifier => {
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
    (modifierMixins ?? this.modifierMixins).forEach((mixin) =>
      mixin.apply(modifier, this.totalStats)
    );

    // Update extra talent levels (from constellations etc) for display
    this.talentAttackLevelExtra =
      modifier.talentAttackLevel -
      (talentAttackLevel ?? this.state.talentAttackLevel);
    this.talentSkillLevelExtra =
      modifier.talentSkillLevel -
      (talentSkillLevel ?? this.state.talentSkillLevel);
    this.talentBurstLevelExtra =
      modifier.talentBurstLevel -
      (talentBurstLevel ?? this.state.talentBurstLevel);

    return modifier;
  };

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
    teamCharacters,
    characterOptions,
    weaponOptions,
    artifactSetOptions,
    teamOptions,
    artifactBuffOptions,
  }: {
    character?: Character;
    weapon?: Weapon;
    artifacts?: Artifact[];
    artifactSets?: ArtifactSet[];
    artifactSetBonuses?: Stats;
    talentAttackLevel?: number;
    talentSkillLevel?: number;
    talentBurstLevel?: number;
    teamCharacters?: Character[];
    characterOptions?: CharacterOption[];
    weaponOptions?: WeaponOption[];
    artifactSetOptions?: ArtifactSetOption[];
    teamOptions?: CharacterOption[];
    artifactBuffOptions?: ArtifactSetOption[];
  }) => {
    const statMixins = this.getStatMixins({
      character,
      characterOptions,
      weapon,
      weaponOptions,
      artifactSets,
      artifactSetOptions,
      teamCharacters,
      teamOptions,
      artifactBuffOptions,
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
      teamCharacters,
      characterOptions,
      artifactSetOptions,
      teamOptions,
      artifactBuffOptions,
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
    teamCharacters,
    characterOptions,
    weaponOptions,
    artifactSetOptions,
    teamOptions,
    artifactBuffOptions,
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
    teamCharacters?: Character[];
    characterOptions?: CharacterOption[];
    weaponOptions?: WeaponOption[];
    artifactSetOptions?: ArtifactSetOption[];
    teamOptions?: CharacterOption[];
    artifactBuffOptions?: ArtifactSetOption[];
  }) => {
    const character = newChar ?? this.state.character;

    const modifierMixins = this.getModifierMixins({
      character,
      characterOptions,
      weapon,
      weaponOptions,
      artifactSets,
      artifactSetOptions,
      teamCharacters,
      teamOptions,
      artifactBuffOptions,
    });

    const damageModifier = this.getDamageModifier({
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

    this.talentValues = {};
    Object.entries(character.talentFns).forEach(([type, fns]) => {
      this.talentValues[type] = Object.entries(fns).reduce((acc, [id, fn]) => {
        acc[id] = fn({ stats: this.totalStats, modifier: damageModifier });
        return acc;
      }, {} as Record<string, TalentValue>);
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
      teamCharacters: this.state.teamCharacters,
      teamOptions: this.state.teamOptions,
      artifactBuffOptions: this.state.artifactBuffOptions,
    });
    this.getModifierMixins({
      character: this.state.character,
      characterOptions: this.state.characterOptions,
      weapon: this.state.weapon,
      weaponOptions: this.state.weaponOptions,
      artifactSets: this.state.artifactSets,
      artifactSetOptions: this.state.artifactSetOptions,
      teamCharacters: this.state.teamCharacters,
      teamOptions: this.state.teamOptions,
      artifactBuffOptions: this.state.artifactBuffOptions,
    });

    this.updateArtifactSetBonuses({});
    this.setState({});
  };

  render() {
    return (
      <Container className='app px-0' fluid>
        <Navbar sticky='top' bg='light' className='d-md-none'>
          <Nav>
            <Nav.Item>
              <Nav.Link href='#input-column'>Input</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#artifact-column'>Artifacts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#stat-column'>Stats</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='#talent-column'>Talents</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>

        <Row className='mx-0 flex-md-nowrap'>
          <InputColumn
            appState={this.state}
            setAppState={this.setAppState}
            updateArtifactSetBonuses={this.updateArtifactSetBonuses}
            updateTotalStats={this.updateTotalStats}
            updateTalentValues={this.updateTalentValues}
            refreshApp={this.refreshApp}
            talentAttackLevelExtra={this.talentAttackLevelExtra}
            talentSkillLevelExtra={this.talentSkillLevelExtra}
            talentBurstLevelExtra={this.talentBurstLevelExtra}
          />
          <ArtifactColumn
            appState={this.state}
            setAppState={this.setAppState}
            updateTotalStats={this.updateTotalStats}
            artifactSetBonuses={this.artifactSetBonuses}
            getDamageModifier={this.getDamageModifier}
            getStatMixins={this.getStatMixins}
            getModifierMixins={this.getModifierMixins}
          />
          <StatColumn
            appState={this.state}
            totalStats={this.totalStats}
            artifactSetBonuses={this.artifactSetBonuses}
          />
          <TalentColumn talentValues={this.talentValues} />
          <DPSColumn
            appState={this.state}
            setAppState={this.setAppState}
            artifactSetBonuses={this.artifactSetBonuses}
            getDamageModifier={this.getDamageModifier}
            getStatMixins={this.getStatMixins}
            getModifierMixins={this.getModifierMixins}
            talentValues={this.talentValues}
          />
        </Row>
      </Container>
    );
  }
}

export default App;

// Function type definitions (for convenience)
export type GetModifierMixinsFn = (params?: {
  character?: Character;
  characterOptions?: CharacterOption[];
  weapon?: Weapon;
  weaponOptions?: WeaponOption[];
  artifactSets?: ArtifactSet[];
  artifactSetOptions?: ArtifactSetOption[];
  teamCharacters?: Character[];
  teamOptions?: CharacterOption[];
  artifactBuffOptions?: ArtifactSetOption[];
  updateCache?: boolean;
}) => ModifierMixin[];

export type GetStatMixinsFn = (params?: {
  character?: Character;
  characterOptions?: CharacterOption[];
  weapon?: Weapon;
  weaponOptions?: WeaponOption[];
  artifactSets?: ArtifactSet[];
  artifactSetOptions?: ArtifactSetOption[];
  teamCharacters?: Character[];
  teamOptions?: CharacterOption[];
  artifactBuffOptions?: ArtifactSetOption[];
  updateCache?: boolean;
}) => StatMixin[];

export type GetDamageModifierFn = (params?: {
  characterLevel?: number;
  enemyLevel?: number;
  enemyRes?: Resistance;
  critType?: CritType;
  reaction?: Reaction;
  talentAttackLevel?: number;
  talentSkillLevel?: number;
  talentBurstLevel?: number;
  modifierMixins?: ModifierMixin[];
}) => DamageModifier;
