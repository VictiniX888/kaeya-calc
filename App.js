import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React, { Component } from 'react';
import { Image, Text, TextInput, View } from 'react-native';

import Character from './js/Character.js';
import Weapon from './js/Weapon.js';
import Artifact, { mainStatProps, subStatProps } from './js/Artifact.js';
import * as statUtils from './js/Stat.js';
import * as data from './js/Data.js';

import styles from './js/Styles.js';

export default class App extends Component {

  constructor() {
    super();  

    // Initialize sorted list of characters and weapons
    this.characters = data.getSortedCharacterList();
    this.weapons = data.getSortedWeaponList();

    this.state = {
      characterId: undefined,
      character: undefined,
      characterLevel: 1,
      isCharacterAscended: false,

      weaponId: undefined,
      weapon: undefined,
      weaponLevel: 1,
      isWeaponAscended: false,

      characterStats: undefined,
      weaponStats: undefined,
      totalStats: undefined,

      artifactFlower: new Artifact('Flower'),
      artifactFeather: new Artifact('Feather'),
      artifactSands: new Artifact('Sands'),
      artifactGoblet: new Artifact('Goblet'),
      artifactCirclet: new Artifact('Circlet'),
    }
  }

  renderCharacterList = () => {    
    return (
      <View style={styles.inputRow}>
        <Text>Character: </Text>
        <Picker 
          style={styles.characterSelect}
          selectedValue={this.state.characterId}
          onValueChange={(value, _) => {
            if (value != 0) {
              let character = new Character(value);
              let stats = character.getInnateStatsAt(this.state.characterLevel, this.state.isCharacterAscended);

              this.setState({
                characterId: value,
                character: character,
                characterStats: stats
              }, () => {
                // callback function from setstate
                this.setTotalStats();
              });
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {this.characters.map(id => <Picker.Item label={data.getCharacterData(id).name} value={id} key={id} />)}
        </Picker>
      </View>
    )
  }

  renderWeaponList = () => {
    return (
      <View style={styles.inputRow}>
        <Text>Weapon: </Text>
        <Picker
          style={styles.characterSelect}
          selectedValue={this.state.weaponId}
          onValueChange={(value, _) => {
            if (value != 0) {
              let weapon = new Weapon(value);
              let stats = weapon.getStatsAt(this.state.weaponLevel, this.state.isWeaponAscended);

              this.setState({
                weaponId: value,
                weapon: weapon,
                weaponStats: stats,
              }, () => {
                // callback function from setstate
                this.setTotalStats();
              });
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {this.weapons.map(id => <Picker.Item label={data.getWeaponData(id).name} value={id} key={id} />)}
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

  setCharacterStats = () => {
    if (this.state.character !== undefined) {
      let stats = this.state.character.getInnateStatsAt(this.state.characterLevel, this.state.isCharacterAscended);
      this.setState({ characterStats: stats }, this.setTotalStats)
    }
  }

  setWeaponStats = () => {
    if (this.state.weapon !== undefined) {
      let stats = this.state.weapon.getStatsAt(this.state.weaponLevel, this.state.isWeaponAscended);
      this.setState({ weaponStats: stats }, this.setTotalStats);
    }
  }

  setArtifact = (type) => {
    let artifact = this.state['artifact' + type];
    this.setState({['artifact' + type]: artifact}, this.setTotalStats);
  }

  setTotalStats = () => {
    let artifacts = [this.state.artifactFlower, this.state.artifactFeather, this.state.artifactSands, this.state.artifactGoblet, this.state.artifactCirclet];

    let stats = statUtils.getTotalStatsAt(
      this.state.weapon, 
      this.state.weaponLevel, 
      this.state.isWeaponAscended, 
      this.state.character,
      this.state.characterLevel,
      this.state.isCharacterAscended,
      artifacts,
    );
    
    this.setState({ totalStats: stats });
  }

  renderCharacterStats = () => {
    return (
      this.state.character ? (
        <View style={styles.resultBlock}>
          <Text style={styles.titleText}>Character</Text>
          {this.renderCharacterImage()}
          <Text style={styles.resultText}>{this.state.character ? this.state.character.name : ''}</Text>
          {
            this.state.characterStats ? (
              Object.entries(this.state.characterStats).map(([stat, value]) => {
                return <Text style={styles.resultText} key={stat}>{data.propMapping[stat].name}: {statUtils.getStatDisplayValue(value, data.propMapping[stat].isPercentage)}</Text>
              })
            ) : null
          }
        </View>
      ) : null
    )
  }

  renderWeaponStats = () => {
    return (
      this.state.weapon ? (
        <View style={styles.resultBlock}>
          <Text style={styles.titleText}>Weapon</Text>
          <Text style={styles.resultText}>{this.state.weapon ? this.state.weapon.name : ''}</Text>
          {
            this.state.weaponStats ? (
              Object.entries(this.state.weaponStats).map(([stat, value]) => {
                return <Text style={styles.resultText} key={stat}>{data.propMapping[stat].name}: {statUtils.getStatDisplayValue(value, data.propMapping[stat].isPercentage)}</Text>
              })
            ) : null
          }
        </View>
      ) : null
    )
  }

  renderArtifactMainStat = (type) => {
    return (
      <View style={styles.inputRow}>
        <Picker
          selectedValue={this.state['artifact' + type].mainStat.stat}
          onValueChange={(stat, _) => {
            if (stat != 0) {
              let mainStat = this.state['artifact'+type].mainStat;
              this.state['artifact' + type].setStat(mainStat, stat, undefined, data.propMapping[stat].isPercentage);

              // Force refresh
              this.setArtifact(type);
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {mainStatProps[type].map(prop => <Picker.Item label={data.propMapping[prop].name} value={prop} key={prop} />)}
        </Picker>

        <Text> : </Text>

        <TextInput 
          style={styles.statInput} 
          onChangeText={text => {
            let mainStat = this.state['artifact'+type].mainStat;
            if (mainStat.stat) {
              this.state['artifact' + type].setStat(mainStat, undefined, parseFloat(text), data.propMapping[mainStat.stat].isPercentage);
            } else {
              // If stat type is not yet set
              this.state['artifact' + type].setStat(mainStat, undefined, parseFloat(text), false);
            }

            // Force refresh
            this.setArtifact(type);
          }}
        />
      </View>
    )
  }

  renderArtifactSubStats = (type) => {
    return (
      <View>
        {
          this.state['artifact' + type].subStats.map((subStat, index) => {
            return (
              <View style={styles.inputRow} key={index}>
                <Picker
                  selectedValue={subStat.stat}
                  onValueChange={(stat, _) => {
                    if (stat != 0) {
                      this.state['artifact' + type].setStat(subStat, stat, undefined, data.propMapping[stat].isPercentage);
      
                      // Force refresh
                      this.setArtifact(type);
                    }
                  }}
                >
                  <Picker.Item label='' value={0} />
                  {subStatProps.map(prop => <Picker.Item label={data.propMapping[prop].name} value={prop} key={prop} />)}
                </Picker>

                <Text> : </Text>

                <TextInput 
                  style={styles.statInput} 
                  onChangeText={text => {
                    let stat = subStat.stat;
                    if (stat) {
                      this.state['artifact' + type].setStat(subStat, undefined, parseFloat(text), data.propMapping[stat].isPercentage);
                    } else {
                      // If stat type is not yet set
                      this.state['artifact' + type].setStat(subStat, undefined, parseFloat(text), false);
                    }

                    // Force refresh
                    this.setArtifact(type);
                  }}
                />
              </View>
            )
          })
        }
      </View>
    )
  }

  renderArtifactStat = (type, isLast = false) => {
    return (
      <View style={isLast ? styles.artifactBlockNoBorder : styles.artifactBlock}>
        <Text style={styles.artifactType}>{type}</Text>

        <Text style={styles.artifactStatType}>Main Stat</Text>
        {this.renderArtifactMainStat(type)}

        <Text style={styles.artifactStatType}>Substats</Text>
        {this.renderArtifactSubStats(type)}
      </View>
    )
  }

  renderAllArtifactStats = () => {
    return (
      <View style={styles.resultBlockNoBorder}>
        <Text style={styles.titleText}>Artifacts</Text>
        {this.renderArtifactStat('Flower')}
        {this.renderArtifactStat('Feather')}
        {this.renderArtifactStat('Sands')}
        {this.renderArtifactStat('Goblet')}
        {this.renderArtifactStat('Circlet', true)}
      </View>
    )
  }

  renderTotalStats = () => {
    return (
      <View style={styles.resultBlockNoBorder}>
        <Text style={styles.titleText}>Stat Total</Text>
        {
          this.state.totalStats ? (
            Object.entries(this.state.totalStats).map(([stat, value]) => {
              return <Text style={styles.resultText} key={stat}>{data.propMapping[stat].name}: {statUtils.getStatDisplayValue(value, data.propMapping[stat].isPercentage)}</Text>
            })
          ) : null
        }
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputColumn}>
          {this.renderCharacterList()}

          <View style={styles.inputRow}>
            <Text>Level: </Text>
            <TextInput 
              style={styles.levelInput}
              defaultValue={this.state.characterLevel} 
              onChangeText={text => {
                this.setState({characterLevel: parseInt(text)}, () => { this.setCharacterStats() });
              }}
            />
          </View>

          <View style={styles.inputRow}>
            <Text>Ascended? </Text>
            <Checkbox
              onValueChange={value => this.setState({isCharacterAscended: value}, () => { this.setCharacterStats() })}
              value={this.state.isCharacterAscended}
            />
          </View>

          <br/>

          {this.renderWeaponList()}

          <View style={styles.inputRow}>
            <Text>Level: </Text>
            <TextInput 
              style={styles.levelInput}
              defaultValue={this.state.weaponLevel} 
              onChangeText={text => {
                this.setState({weaponLevel: parseInt(text)}, () => { this.setWeaponStats() });
              }}
            />
          </View>

          <View style={styles.inputRow}>
            <Text>Ascended? </Text>
            <Checkbox
              onValueChange={value => this.setState({isWeaponAscended: value}, () => { this.setWeaponStats() })}
              value={this.state.isWeaponAscended}
            />
          </View>

        </View>

        <View style={styles.resultColumn}>
          {this.renderCharacterStats()}
          {this.renderWeaponStats()}
          {this.renderAllArtifactStats()}
        </View>

        <View style={styles.resultColumn}>
          {this.renderTotalStats()}
        </View>

        <View style={styles.fillerColumn}>
        </View>

      </View>
    )
  }
}
