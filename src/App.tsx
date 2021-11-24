import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import Row from 'react-bootstrap/esm/Row';
import './App.css';
import Artifact from './artifact/Artifact';
import ArtifactSet from './artifact/ArtifactSet';
import {
  getAllArtifactSetBonuses,
  initArtifactSet,
} from './artifact/ArtifactSetUtil';
import { ArtifactType } from './artifact/types';
import Character from './character/Character';
import { initCharacter } from './character/CharacterUtil';
import ArtifactColumn from './component/ArtifactColumn';
import DPSColumn from './component/DPSColumn';
import InputColumn from './component/InputColumn';
import StatColumn from './component/StatColumn';
import TalentColumn from './component/TalentColumn';
import { Stats } from './data/types';
import Attack from './dps/Attack';
import OHCAttack from './dps/OHCAttack';
import CritType from './modifier/CritType';
import DamageModifier, { getDamageModifier } from './modifier/DamageModifer';
import Reaction from './modifier/Reaction';
import ArtifactSetOption from './option/artifactSetOptions/ArtifactSetOption';
import CharacterOption from './option/characterOptions/CharacterOption';
import SwirlOption from './option/characterOptions/SwirlOption';
import {
  getModifierMixins,
  getStatMixins,
  ModifierMixin,
  StatMixin,
} from './option/Mixin';
import WeaponOption from './option/weaponOptions/WeaponOption';
import Resistance from './stat/Resistance';
import { getTotalStatsAt } from './stat/Stat';
import { getAllTalentFns } from './talent/Talent';
import { Talents, TalentValue, TalentValueSet } from './talent/types';
import Weapon from './weapon/Weapon';
import { initWeapon } from './weapon/WeaponUtil';

export type AppState = {
  character: Character;
  weapon: Weapon;
  artifacts: Artifact[];

  artifactSets: ArtifactSet[];

  enemyLevel: number;
  enemyRes: Resistance;
  critType: CritType;
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
  swirlOption: SwirlOption;

  rotationTime: number;
  rotation: Attack[];
  ohcRotation: OHCAttack[];
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
    enemyRes: new Resistance(),
    critType: CritType.None,
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
    swirlOption: new SwirlOption(),

    rotationTime: 0,
    rotation: [],
    ohcRotation: [],
  };

  artifactSetBonuses: Stats = {};
  totalStats: Stats = {};
  talents: Talents = {};
  talentValues: TalentValueSet = {};

  modifierMixins: ModifierMixin[] = [];
  statMixins: StatMixin[] = [];

  talentAttackLevelExtra: number = 0;
  talentSkillLevelExtra: number = 0;
  talentBurstLevelExtra: number = 0;

  // "Overrides" getModifierMixins for extra functionality and defaults based on state
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
    swirlOption,
    updateCache = true,
  } = {}): ModifierMixin[] => {
    if (
      character === undefined &&
      characterOptions === undefined &&
      weapon === undefined &&
      weaponOptions === undefined &&
      artifactSets === undefined &&
      artifactSetOptions === undefined &&
      teamCharacters === undefined &&
      teamOptions === undefined &&
      artifactBuffOptions === undefined &&
      swirlOption === undefined
    ) {
      return this.modifierMixins;
    }

    const modifierMixins = getModifierMixins({
      character: character ?? this.state.character,
      characterOptions: characterOptions ?? this.state.characterOptions,
      weapon: weapon ?? this.state.weapon,
      weaponOptions: weaponOptions ?? this.state.weaponOptions,
      artifactSets: artifactSets ?? this.state.artifactSets,
      artifactSetOptions: artifactSetOptions ?? this.state.artifactSetOptions,
      teamCharacters: teamCharacters ?? this.state.teamCharacters,
      teamOptions: teamOptions ?? this.state.teamOptions,
      artifactBuffOptions:
        artifactBuffOptions ?? this.state.artifactBuffOptions,
      swirlOption: swirlOption ?? this.state.swirlOption,
    });

    if (updateCache) {
      this.modifierMixins = modifierMixins;
    }

    return modifierMixins;
  };

  // "Overrides" getStatMixins for extra functionality and defaults based on state
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
  } = {}): StatMixin[] => {
    if (
      character === undefined &&
      characterOptions === undefined &&
      weapon === undefined &&
      weaponOptions === undefined &&
      artifactSets === undefined &&
      artifactSetOptions === undefined &&
      teamCharacters === undefined &&
      teamOptions === undefined &&
      artifactBuffOptions === undefined
    ) {
      return this.statMixins;
    }

    const statMixins = getStatMixins({
      character: character ?? this.state.character,
      characterOptions: characterOptions ?? this.state.characterOptions,
      weapon: weapon ?? this.state.weapon,
      weaponOptions: weaponOptions ?? this.state.weaponOptions,
      artifactSets: artifactSets ?? this.state.artifactSets,
      artifactSetOptions: artifactSetOptions ?? this.state.artifactSetOptions,
      teamCharacters: teamCharacters ?? this.state.teamCharacters,
      teamOptions: teamOptions ?? this.state.teamOptions,
      artifactBuffOptions:
        artifactBuffOptions ?? this.state.artifactBuffOptions,
    });

    if (updateCache) {
      this.statMixins = statMixins;
    }

    return statMixins;
  };

  // "Overrides" getDamageModifier for extra functionality and defaults based on state
  getDamageModifier: GetDamageModifierFn = ({
    characterLevel = this.state.character.level,
    enemyLevel = this.state.enemyLevel,
    enemyRes = this.state.enemyRes,
    critType = this.state.critType,
    reaction = this.state.reaction,
    talentAttackLevel = this.state.talentAttackLevel,
    talentSkillLevel = this.state.talentSkillLevel,
    talentBurstLevel = this.state.talentBurstLevel,
    modifierMixins = this.modifierMixins,
  } = {}): DamageModifier => {
    const modifier = getDamageModifier({
      characterLevel,
      enemyLevel,
      enemyRes,
      critType,
      reaction,
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
      modifierMixins,
      stats: this.totalStats,
    });

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
    this.artifactSetBonuses = getAllArtifactSetBonuses(newArtifactSets);

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
    character,
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
    swirlOption,
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
    swirlOption?: SwirlOption;
  }) => {
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
      swirlOption,
    });

    const damageModifier = this.getDamageModifier({
      characterLevel: character?.level,
      enemyLevel,
      enemyRes,
      critType,
      reaction,
      talentAttackLevel,
      talentSkillLevel,
      talentBurstLevel,
      modifierMixins,
    });

    this.talents = getAllTalentFns(
      character ?? this.state.character,
      weapon ?? this.state.weapon
    );

    this.talentValues = {};
    Object.entries(this.talents).forEach(([type, fns]) => {
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
      swirlOption: this.state.swirlOption,
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
            talents={this.talents}
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
  swirlOption?: SwirlOption;
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
  swirlElement?: string;
  modifierMixins?: ModifierMixin[];
}) => DamageModifier;
