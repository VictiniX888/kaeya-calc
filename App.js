import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Character from './js/Character.js';
import characterMappingRaw from './static/characterdata.json';

export default class App extends Component {
  characterData;
  characterLevelCurve;
  ascensionData;

  constructor() {
    super();
    this.state = {
      loadedDataElements: 0,
      characterName: "",
      character: undefined,
      characterLevel: 1,
      isCharacterAscended: false,
    }

    this.characterMapping = characterMappingRaw.reduce((map, obj) => {
      map[obj.Name] = obj;
      return map;
    }, {});
  }

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

  renderCharacterStats = () => {
    return (
      <View>
        <Text>Selected character: {this.state.characterName}</Text>
        <Text>Character ATK: {this.state.character.getAtkAt(this.state.characterLevel, this.state.isCharacterAscended)}</Text>
      </View>
    )
  }

  render() {
    let hasLoaded = this.state.loadedDataElements == 3;
    if (hasLoaded) {
      return (
        <View style={styles.container}>

          <View>
            <Picker 
              selectedValue={this.state.characterName}
              onValueChange={(value, _) => {
                if (value != "") {
                  this.setState({
                    characterName: value,
                    character: new Character(value, this.characterMapping, this.characterData, this.characterLevelCurve, this.ascensionData),
                  })
                }
              }}
            >
              <Picker.Item label="" value="" />
              {Object.keys(this.characterMapping).map(name => <Picker.Item label={name} value={name} />)}
            </Picker>
          </View>

          <View>
            <TextInput 
              defaultValue={this.state.characterLevel} 
              onChangeText={text => {
                let textAsInt = parseInt(text);
                if (textAsInt >= 1 && textAsInt <= 90) {
                  this.setState({characterLevel: textAsInt});
                }
              }}
            />

            <Checkbox
              onValueChange={value => this.setState({isCharacterAscended: value})}
              value={this.state.isCharacterAscended}
            />
          </View>

          {this.state.character ? this.renderCharacterStats() : null}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
