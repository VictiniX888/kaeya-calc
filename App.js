import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React, { Component } from 'react';
import { Image, Text, TextInput, View } from 'react-native';

import Character from './js/Character.js';
import Weapon from './js/Weapon.js';

import characterMappingRaw from './static/characterdata.json';
import weaponMappingRaw from './static/weapondata.json';

import styles from './js/Styles.js';

export default class App extends Component {
  characterData;
  characterLevelCurve;
  characterAscensionData;
  weaponData;
  weaponLevelCurve;
  weaponAscensionData;
  weaponRefinementData;

  constructor() {
    super();

    this.state = {
      loadedDataElements: 0,
      characterId: undefined,
      character: undefined,
      characterLevel: 1,
      isCharacterAscended: false,
      weaponId: undefined,
      weapon: undefined,
      weaponLevel: 1,
      isWeaponAscended: false,
    }

    this.characterMapping = characterMappingRaw.reduce((map, obj) => {
      map[obj.Id] = obj;
      return map;
    }, {});

    this.weaponMapping = weaponMappingRaw.reduce((map, obj) => {
      map[obj.Id] = obj;
      return map;
    }, {});
  }

  // Called when component is mounted for the first time
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/Dimbreath/GenshinData/main/Excel/AvatarExcelConfigData.json')
      .then(res => res.json())
      .then(data => data.reduce((map, obj) => {
        map[obj.Id] = obj;
        return map;
      }, {}))
      .then(obj => {
        this.characterData = obj;
        this.setState((state) => { return {loadedDataElements: state.loadedDataElements + 1} });
      });
    
    fetch('https://raw.githubusercontent.com/Dimbreath/GenshinData/main/Excel/AvatarCurveExcelConfigData.json')
      .then(res => res.json())
      .then(data => data.reduce((map, obj) => {
        map[obj.Level] = obj.CurveInfos;
        return map;
      }, {}))
      .then(obj => {
        this.characterLevelCurve = obj;
        this.setState((state) => { return {loadedDataElements: state.loadedDataElements + 1} });
      });

    fetch('https://raw.githubusercontent.com/Dimbreath/GenshinData/main/Excel/AvatarPromoteExcelConfigData.json')
      .then(res => res.json())
      .then(obj => {
        this.characterAscensionData = obj;
        this.setState((state) => { return {loadedDataElements: state.loadedDataElements + 1} });
      }); 

    fetch('https://raw.githubusercontent.com/Dimbreath/GenshinData/main/Excel/WeaponExcelConfigData.json')
      .then(res => res.json())
      .then(data => data.reduce((map, obj) => {
        map[obj.Id] = obj;
        return map;
      }, {}))
      .then(obj => {
        this.weaponData = obj;
        this.setState((state) => { return {loadedDataElements: state.loadedDataElements + 1} });
      });
    
    fetch('https://raw.githubusercontent.com/Dimbreath/GenshinData/main/Excel/WeaponCurveExcelConfigData.json')
      .then(res => res.json())
      .then(data => data.reduce((map, obj) => {
        map[obj.Level] = obj.CurveInfos;
        return map;
      }, {}))
      .then(obj => {
        this.weaponLevelCurve = obj;
        this.setState((state) => { return {loadedDataElements: state.loadedDataElements + 1} });
      });

    fetch('https://raw.githubusercontent.com/Dimbreath/GenshinData/main/Excel/WeaponPromoteExcelConfigData.json')
      .then(res => res.json())
      .then(obj => {
        this.weaponAscensionData = obj;
        this.setState((state) => { return {loadedDataElements: state.loadedDataElements + 1} });
      }); 
  }

  renderCharacterList = () => {
    let sortedChars = Object.entries(this.characterMapping).sort(([, char1], [, char2]) => char1.Name.localeCompare(char2.Name));
    
    return (
      <View style={styles.characterSelectRow}>
        <Text>Character: </Text>
        <Picker 
          style={styles.characterSelect}
          selectedValue={this.state.characterId}
          onValueChange={(value, _) => {
            if (value != 0) {
              this.setState({
                characterId: value,
                character: new Character(value, this.characterMapping, this.characterData, this.characterLevelCurve, this.characterAscensionData),
              })
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {sortedChars.map(([id, character]) => <Picker.Item label={character.Name} value={id} />)}
        </Picker>
      </View>
    )
  }

  renderWeaponList = () => {
    let weapons = Object.entries(this.weaponMapping);

    return (
      <View style={styles.characterSelectRow}>
        <Text>Weapon: </Text>
        <Picker
          style={styles.characterSelect}
          selectedValue={this.state.weaponId}
          onValueChange={(value, _) => {
            if (value != 0) {
              this.setState({
                weaponId: value,
                weapon: new Weapon(value, this.weaponMapping, this.weaponData, this.weaponLevelCurve, this.weaponAscensionData, this.weaponRefinementData),
              })
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {weapons.map(([id, weapon]) => <Picker.Item label={weapon.Name} value={id} />)}
        </Picker>
      </View>
    )
  }

  renderCharacterImage = () => {
    let imageUrl = `https://rerollcdn.com/GENSHIN/Characters/${this.state.character.name}.png`
    return (
      <Image style={styles.characterImage} source={{uri: imageUrl, width: 70, height: 70}} />
    )
  }

  renderCharacterStats = () => {
    let stats = this.state.character.getStatsWithWeaponAt(this.state.weapon, this.state.weaponLevel, this.state.isWeaponAscended, this.state.characterLevel, this.state.isCharacterAscended);
    return (
      <View>
        {this.renderCharacterImage()}
        <Text style={styles.resultText}>Selected character: {this.state.character.name}</Text>
        <Text style={styles.resultText}>Character HP: {Math.round(stats.InnateHp)}</Text>
        <Text style={styles.resultText}>Character ATK: {Math.round(stats.InnateAtk)}</Text>
        <Text style={styles.resultText}>Character DEF: {Math.round(stats.InnateDef)}</Text>

        <br/>

        {/* Render weapon stats */}
        {
          this.state.weapon ? (
            <View>
              <Text style={styles.resultText}>Selected weapon: {this.state.weapon ? this.state.weapon.name : ''}</Text>
              <Text style={styles.resultText}>Weapon HP: {(stats.WeaponHp != null) ? Math.round(stats.WeaponHp) : '-'}</Text>
              <Text style={styles.resultText}>Weapon ATK: {(stats.WeaponAtk != null) ? Math.round(stats.WeaponAtk) : '-'}</Text>
              <Text style={styles.resultText}>Weapon DEF: {(stats.WeaponDef != null) ? Math.round(stats.WeaponDef) : '-'}</Text>
            </View>
          ) : null
        }
      </View>
    )
  }

  render() {
    let hasLoaded = this.state.loadedDataElements == 6;
    if (hasLoaded) {
      return (
        <View style={styles.container}>
          <View style={styles.inputColumn}>
            {this.renderCharacterList()}

            <View style={styles.levelInputRow}>
              <Text>Level: </Text>
              <TextInput 
                style={styles.levelInput}
                defaultValue={this.state.characterLevel} 
                onChangeText={text => {
                  let textAsInt = parseInt(text);
                  if (textAsInt >= 1 && textAsInt <= 90) {
                    this.setState({characterLevel: textAsInt});
                  }
                }}
              />
            </View>

            <View style={styles.ascensionCheckRow}>
              <Text>Ascended? </Text>
              <Checkbox
                onValueChange={value => this.setState({isCharacterAscended: value})}
                value={this.state.isCharacterAscended}
              />
            </View>

            <br/>

            {this.renderWeaponList()}

            <View style={styles.levelInputRow}>
              <Text>Level: </Text>
              <TextInput 
                style={styles.levelInput}
                defaultValue={this.state.weaponLevel} 
                onChangeText={text => {
                  this.setState({weaponLevel: parseInt(text)});
                }}
              />
            </View>

            <View style={styles.ascensionCheckRow}>
              <Text>Ascended? </Text>
              <Checkbox
                onValueChange={value => this.setState({isWeaponAscended: value})}
                value={this.state.isWeaponAscended}
              />
            </View>

          </View>

          <View style={styles.resultColumn}>
            {this.state.character ? this.renderCharacterStats() : null}
          </View>

        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }
  }
}


