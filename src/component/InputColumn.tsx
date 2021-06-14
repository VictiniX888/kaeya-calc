import React from 'react';
import { AppState } from '../App';
import Artifact from '../js/artifact/Artifact';
import Character from '../js/Character';
import Weapon from '../js/weapon/Weapon';
import CharacterPicker from './CharacterPicker';
import Checkbox from './Checkbox';
import Column from './Column';
import InputRow from './InputRow';
import IntInput from './IntInput';
import WeaponPicker from './WeaponPicker';

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
};

class InputColumn extends React.Component<InputColumnProps> {
  setCharacterId = (id: string) => {
    const character = this.props.appState.character;
    character.id = id;
    this.props.updateTotalStats({ character });
    this.props.setAppState({ character });
  };

  setCharacterLevel = (level: number) => {
    const character = this.props.appState.character;
    character.level = level;
    this.props.updateTotalStats({ character });
    this.props.setAppState({ character });
  };

  setIsCharacterAscended = (isAscended: boolean) => {
    const character = this.props.appState.character;
    character.hasAscended = isAscended;
    this.props.updateTotalStats({ character });
    this.props.setAppState({ character });
  };

  setWeaponId = (id: string) => {
    const weapon = this.props.appState.weapon;
    weapon.id = id;
    this.props.updateTotalStats({ weapon });
    this.props.setAppState({ weapon });
  };

  setWeaponLevel = (level: number) => {
    const weapon = this.props.appState.weapon;
    weapon.weaponLevel = level;
    this.props.updateTotalStats({ weapon });
    this.props.setAppState({ weapon });
  };

  setIsWeaponAscended = (isAscended: boolean) => {
    const weapon = this.props.appState.weapon;
    weapon.hasAscended = isAscended;
    this.props.updateTotalStats({ weapon });
    this.props.setAppState({ weapon });
  };

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
    const appState = this.props.appState;

    return (
      <Column className='input-column'>
        <InputRow>
          <CharacterPicker
            characterId={appState.character.id}
            setCharacterId={this.setCharacterId}
          />
        </InputRow>

        <InputRow>
          <IntInput
            id='character-level-input'
            label='Level:'
            defaultValue={1}
            value={appState.character.level}
            onInput={this.setCharacterLevel}
            className='level-input'
          />
        </InputRow>

        <InputRow>
          <Checkbox
            id='character-ascension-checkbox'
            label='Ascended?'
            defaultValue={false}
            value={appState.character.hasAscended}
            onChange={this.setIsCharacterAscended}
          />
        </InputRow>

        <br />

        <InputRow>
          <WeaponPicker
            weaponId={appState.weapon.id}
            setWeaponId={this.setWeaponId}
          />
        </InputRow>

        <InputRow>
          <IntInput
            id='weapon-level-input'
            label='Level:'
            defaultValue={1}
            value={appState.weapon.weaponLevel}
            onInput={this.setWeaponLevel}
            className='level-input'
          />
        </InputRow>

        <InputRow>
          <Checkbox
            id='weapon-ascension-checkbox'
            label='Ascended?'
            defaultValue={false}
            value={appState.weapon.hasAscended}
            onChange={this.setIsWeaponAscended}
          />
        </InputRow>

        <br />

        <InputRow>
          <IntInput
            id='talent-attack-level-input'
            label='Attack Talent Level:'
            defaultValue={1}
            value={appState.talentAttackLevel}
            onInput={this.setTalentAttackLevel}
            className='level-input'
          />
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
        </InputRow>
      </Column>
    );
  }
}

export default InputColumn;
