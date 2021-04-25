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

  // Class properties
  character;
  weapon;
  artifactFlower;
  artifactFeather;
  artifactSands;
  artifactGoblet;
  artifactCirclet;

  constructor() {
    super();  

    // Initialize sorted list of characters and weapons
    this.characters = data.getSortedCharacterList();
    this.weapons = data.getSortedWeaponList();

    this.artifactFlower = new Artifact('Flower');
    this.artifactFeather = new Artifact('Feather');
    this.artifactSands = new Artifact('Sands');
    this.artifactGoblet = new Artifact('Goblet');
    this.artifactCirclet = new Artifact('Circlet');

    this.state = {
      characterId: undefined,
      characterLevel: 1,
      isCharacterAscended: false,

      weaponId: undefined,
      weaponLevel: 1,
      isWeaponAscended: false,

      characterStats: undefined,
      weaponStats: undefined,
      totalStats: undefined,
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
              this.character = new Character(value);
              this.setState({ characterId: value }, this.setCharacterState);
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
              this.weapon = new Weapon(value);
              this.setState({ weaponId: value }, this.setWeaponState);
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
    let imageUrl = `https://rerollcdn.com/GENSHIN/Characters/${this.character.name}.png`
    return (
      <Image style={styles.characterImage} source={{uri: imageUrl, width: 70, height: 70}} />
    )
  }

  setCharacterState = () => {
    if (this.character !== undefined) {
      let stats = this.character.getInnateStatsAt(this.state.characterLevel, this.state.isCharacterAscended);
      let totalStats = this.getTotalStats();
      this.setState({ 
        characterStats: stats,
        totalStats: totalStats,
      });
    }
  }

  setWeaponState = () => {
    if (this.weapon !== undefined) {
      let stats = this.weapon.getStatsAt(this.state.weaponLevel, this.state.isweaponAscended);
      let totalStats = this.getTotalStats();
      this.setState({ 
        weaponStats: stats,
        totalStats: totalStats,
      });
    }
  }

  setArtifactState = (type) => {
    let totalStats = this.getTotalStats();
    this.setState({ totalStats: totalStats });
  }

  getTotalStats = () => {
    let artifacts = [this.artifactFlower, this.artifactFeather, this.artifactSands, this.artifactGoblet, this.artifactCirclet];

    let stats = statUtils.getTotalStatsAt(
      this.weapon, 
      this.state.weaponLevel, 
      this.state.isWeaponAscended, 
      this.character,
      this.state.characterLevel,
      this.state.isCharacterAscended,
      artifacts,
    );

    return stats;
  }

  renderCharacterStats = () => {
    return (
      this.character ? (
        <View style={styles.resultBlock}>
          <Text style={styles.titleText}>Character</Text>
          {this.renderCharacterImage()}
          <Text style={styles.resultText}>{this.character ? this.character.name : ''}</Text>
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
      this.weapon ? (
        <View style={styles.resultBlock}>
          <Text style={styles.titleText}>Weapon</Text>
          <Text style={styles.resultText}>{this.weapon ? this.weapon.name : ''}</Text>
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
          selectedValue={this['artifact' + type].mainStat.stat}
          onValueChange={(stat, _) => {
            if (stat != 0) {
              let mainStat = this['artifact' + type].mainStat;
              this['artifact' + type].setStat(mainStat, stat, undefined, data.propMapping[stat].isPercentage);
              // Update total stats
              this.setArtifactState(type);
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
            let mainStat = this['artifact' + type].mainStat;
            if (mainStat.stat) {
              this['artifact' + type].setStat(mainStat, undefined, parseFloat(text), data.propMapping[mainStat.stat].isPercentage);
            } else {
              // If stat type is not yet set
              this['artifact' + type].setStat(mainStat, undefined, parseFloat(text), false);
            }

            // Update total stats
            this.setArtifactState(type);
          }}
        />
      </View>
    )
  }

  renderArtifactSubStats = (type) => {
    return (
      <View>
        {
          this['artifact' + type].subStats.map((subStat, index) => {
            return (
              <View style={styles.inputRow} key={index}>
                <Picker
                  selectedValue={subStat.stat}
                  onValueChange={(stat, _) => {
                    if (stat != 0) {
                      this['artifact' + type].setStat(subStat, stat, undefined, data.propMapping[stat].isPercentage);     
                      // Update total stats
                      this.setArtifactState(type);
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
                      this['artifact' + type].setStat(subStat, undefined, parseFloat(text), data.propMapping[stat].isPercentage);
                    } else {
                      // If stat type is not yet set
                      this['artifact' + type].setStat(subStat, undefined, parseFloat(text), false);
                    }
                    // Update total stats
                    this.setArtifactState(type);
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

  renderTalentDamage = (type, level, isLast = false) => {
    return (
      <View style={isLast ? styles.artifactBlockNoBorder : styles.artifactBlock}>
        <Text style={styles.artifactType}>{type}</Text>
        {
          this.character ? (
            this.character.getTalentDamageAt(type, level).map((damage, index) => <Text style={styles.resultText} key={index}>{damage}</Text>)
          ) : null
        }
      </View>

    )
  }

  renderAllTalentDamage = () => {
    return (
      <View style={styles.resultBlockNoBorder}>
        <Text style={styles.titleText}>Talents</Text>

        {this.renderTalentDamage('attack', 1)}
        {this.renderTalentDamage('skill', 1)}
        {this.renderTalentDamage('burst', 1, true)}
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
                this.setState({ characterLevel: parseInt(text) }, this.setCharacterState);
              }}
            />
          </View>

          <View style={styles.inputRow}>
            <Text>Ascended? </Text>
            <Checkbox
              onValueChange={value => this.setState({ isCharacterAscended: value }, this.setCharacterState)}
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
                this.setState({ weaponLevel: parseInt(text) }, this.setWeaponState)
              }}
            />
          </View>

          <View style={styles.inputRow}>
            <Text>Ascended? </Text>
            <Checkbox
              onValueChange={value => this.setState({ isWeaponAscended: value }, this.setWeaponState)}
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

        <View style={styles.resultColumn}>
          {this.renderAllTalentDamage()}
        </View>

        <View style={styles.fillerColumn}>
        </View>

      </View>
    )
  }
}
