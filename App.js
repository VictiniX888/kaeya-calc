import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React, { Component } from 'react';
import { Image, Text, TextInput, View } from 'react-native';

import { characterConverter } from './js/Character.js';
import { weaponConverter } from './js/Weapon.js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID } from '@env';

import styles from './js/Styles.js';


export default class App extends Component {

  constructor() {
    super();

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: FIREBASE_APIKEY,
      authDomain: FIREBASE_AUTHDOMAIN,
      projectId: FIREBASE_PROJECTID,
      storageBucket: FIREBASE_STORAGEBUCKET,
      messagingSenderId: FIREBASE_MESSAGINGSENDERID,
      appId: FIREBASE_APPID,
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Initialize Firestore
    this.db = firebase.firestore();

    this.state = {
      hasLoaded: false,

      characterId: undefined,
      character: undefined,
      characterHasInit: false,
      characterLevel: 1,
      isCharacterAscended: false,

      weaponId: undefined,
      weapon: undefined,
      weaponLevel: 1,
      isWeaponAscended: false,

      characterStats: undefined,
      weaponStats: undefined,
    }
  }

  // Called when component is mounted for the first time
  async componentDidMount() {
    // Get ref to stat curves
    this.dbCharStatCurveColRef = this.db.collection('characterStatCurves');
    this.dbWeaponStatCurveColRef = this.db.collection('weaponStatCurves');

    // Get inititialization data (e.g. character and weapon list)
    let dbInitRef = this.db.collection('init').doc('lists');
    let initSnapshot = await dbInitRef.get();
    if (initSnapshot.exists) {
      let doc = initSnapshot.data();
      this.characters = doc.characters; // Array of character names
      this.weapons = doc.weapons;   // Object where key: weapon name and value: weapon type
      this.setState({ hasLoaded: true })
    } else {
      console.log('WARN: Initialization data not found. The page will not be able to load.');
      return;
    }
  }

  renderCharacterList = () => {
    let sortedChars = this.characters.sort((name1, name2) => name1.localeCompare(name2));
    
    return (
      <View style={styles.characterSelectRow}>
        <Text>Character: </Text>
        <Picker 
          style={styles.characterSelect}
          selectedValue={this.state.characterId}
          onValueChange={async (value, _) => {
            if (value != 0) {
              let doc = await this.db.collection('characters').doc(value)
                .withConverter(characterConverter)
                .get()

              if (doc.exists) {
                this.setState({
                  characterId: value,
                  character: await doc.data(),
                  characterHasInit: true,
                });
              } else {
                console.log(`WARN: Could not find data for character ${value}`);
              }
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {sortedChars.map(name => <Picker.Item label={name} value={name} key={name} />)}
        </Picker>
      </View>
    )
  }

  renderWeaponList = () => {
    return (
      <View style={styles.characterSelectRow}>
        <Text>Weapon: </Text>
        <Picker
          style={styles.characterSelect}
          selectedValue={this.state.weaponId}
          onValueChange={async (value, _) => {
            if (value != 0) {
              let weaponType = this.weapons[value];
              let weaponDoc = await this.db.collection('weapons').doc(weaponType).collection(weaponType + 's').doc(value)
                .withConverter(weaponConverter)
                .get();

              if (weaponDoc.exists) {
                this.setState({
                  weaponId: value,
                  weapon: await weaponDoc.data(),
                });
              } else {
                console.log(`WARN: Could not find data for weapon ${value}`);
              }
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {Object.keys(this.weapons).map(name => <Picker.Item label={name} value={name} key={name} />)}
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

  setCharacterStats = async () => {
    let stats = await this.state.character.getInnateStatsAt(this.state.characterLevel, this.state.isCharacterAscended, this.dbCharStatCurveColRef);
    this.setState({ characterStats: stats });
  }

  setWeaponStats = async () => {
    let stats = await this.state.weapon.getStatsAt(this.state.weaponLevel, this.state.isWeaponAscended, this.dbWeaponStatCurveColRef);
    this.setState({ weaponStats: stats });
  }

  hasCharacterParamsChanged = () => {
    let hasChanged = false;

    if (this.state.character !== undefined) {
      hasChanged = hasChanged || ((!isNaN(this.state.characterLevel) || !isNaN(this.state.character.level)) && this.state.characterLevel != this.state.character.level) || (this.state.isCharacterAscended != this.state.character.hasAscended);
    }
    
    return hasChanged;
  }

  hasWeaponParamsChanged = () => {
    let hasChanged = false;

    if (this.state.weapon !== undefined) {
      hasChanged = hasChanged || ((!isNaN(this.state.weaponLevel) || !isNaN(this.state.weapon.weaponLevel)) && this.state.weaponLevel != this.state.weapon.weaponLevel) || (this.state.isWeaponAscended != this.state.weapon.hasAscended);
    }

    return hasChanged;
  }

  renderCharacterStats = () => {
    if (this.hasCharacterParamsChanged()) {
      this.setCharacterStats();
    }

    if(this.hasWeaponParamsChanged()) {
      this.setWeaponStats();
    }

    return (
      <View>
        {/* Render character stats */ }
        {
          this.state.character ? (
            <View>
              {this.renderCharacterImage()}
              <Text style={styles.resultText}>Selected character: {this.state.character ? this.state.character.name : ''}</Text>
              {
                this.state.characterStats ? (
                  // TODO: Make sure the stats are displayed in a particular order
                  Object.entries(this.state.characterStats).map(([stat, value]) => {
                    return <Text style={styles.resultText}>{stat}: {value ? Math.round(value) : '-'}</Text>
                  })
                ) : null
              }
            </View>
          ) : null
        }
        
        <br/>

        {/* Render weapon stats */}
        {
          this.state.weapon ? (
            <View>
              <Text style={styles.resultText}>Selected weapon: {this.state.weapon ? this.state.weapon.name : ''}</Text>
              {
                this.state.weaponStats ? (
                  // TODO: Make sure the stats are displayed in a particular order
                  Object.entries(this.state.weaponStats).map(([stat, value]) => {
                    return <Text style={styles.resultText}>{stat}: {value ? Math.round(value) : '-'}</Text>
                  })
                ) : null
              }
            </View>
          ) : null
        }
      </View>
    )
  }

  render() {
    if (this.state.hasLoaded) {
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
                  this.setState({characterLevel: parseInt(text)});
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
            {this.renderCharacterStats()}
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


