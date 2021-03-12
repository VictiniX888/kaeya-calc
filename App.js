import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React, { Component } from 'react';
import { Image, Text, TextInput, View } from 'react-native';

import Character from './js/Character.js';
import characterMappingRaw from './static/characterdata.json';

import styles from './js/Styles.js';

export default class App extends Component {
  characterData;
  characterLevelCurve;
  ascensionData;

  constructor() {
    super();

    this.state = {
      loadedDataElements: 0,
      characterId: undefined,
      character: undefined,
      characterLevel: 1,
      isCharacterAscended: false,
    }

    this.characterMapping = characterMappingRaw.reduce((map, obj) => {
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
      .then(obj => this.ascensionData = obj)
      .then(obj => {
        this.ascensionData = obj;
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
                character: new Character(value, this.characterMapping, this.characterData, this.characterLevelCurve, this.ascensionData),
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

  renderCharacterImage = () => {
    let imageUrl = `https://rerollcdn.com/GENSHIN/Characters/${this.state.character.name}.png`
    return (
      <Image style={styles.characterImage} source={{uri: imageUrl, width: 70, height: 70}} />
    )
  }

  renderCharacterStats = () => {
    let characterStats = this.state.character.getStatsAt(this.state.characterLevel, this.state.isCharacterAscended);
    return (
      <View>
        {this.renderCharacterImage()}
        <Text style={styles.resultText}>Selected character: {this.state.character.name}</Text>
        <Text style={styles.resultText}>Character HP: {Math.round(characterStats.Hp)}</Text>
        <Text style={styles.resultText}>Character ATK: {Math.round(characterStats.Attack)}</Text>
        <Text style={styles.resultText}>Character DEF: {Math.round(characterStats.Defense)}</Text>
      </View>
    )
  }

  render() {
    let hasLoaded = this.state.loadedDataElements == 3;
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


