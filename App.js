import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { ButtonGroup } from 'react-native-elements';
import React, { Component } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';

import Character from './js/Character.js';
import Weapon from './js/Weapon.js';
import Artifact, { mainStatProps, subStatProps } from './js/Artifact.js';
import ArtifactSet from './js/ArtifactSet.js';
import DamageModifier from './js/DamageModifer.js';
import Option, { getOptions } from './js/option';
import Resistance from './js/Resistance.js';
import * as statUtils from './js/Stat.js';
import * as data from './js/Data.js';

import styles from './js/Styles.js';

export default class App extends Component {
  // Constants
  elements = ['anemo', 'cryo', 'electro', 'geo', 'hydro', 'pyro', 'physical'];

  // Class properties
  character;
  weapon;
  artifactSetStats;
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
    this.artifacts = data.getSortedArtifactSetList();

    this.artifactFlower = new Artifact('Flower');
    this.artifactFeather = new Artifact('Feather');
    this.artifactSands = new Artifact('Sands');
    this.artifactGoblet = new Artifact('Goblet');
    this.artifactCirclet = new Artifact('Circlet');

    this.artifactSets = [0, 0, 0];

    this.state = {
      characterId: undefined,
      characterLevel: 1,
      isCharacterAscended: false,

      weaponId: undefined,
      weaponLevel: 1,
      isWeaponAscended: false,

      artifactSet1Id: undefined,
      artifactSet1Pc: undefined,
      artifactSet2Id: undefined,
      artifactSet2Pc: undefined,
      artifactSet3Id: undefined,
      artifactSet3Pc: undefined,

      talentAttackLevel: 1,
      talentSkillLevel: 1,
      talentBurstLevel: 1,

      critType: 'none',
      enemyLevel: 1,
      enemyRes: new Resistance({}),

      characterStats: undefined,
      weaponStats: undefined,
      totalStats: undefined,

      talentAttackDamage: undefined,
      talentSkillDamage: undefined,
      talentBurstDamage: undefined,

      options: [],
    };
  }

  renderInputColumn = () => {
    return (
      <View>
        {this.renderCharacterList()}

        <View style={styles.inputRow}>
          <Text>Level: </Text>
          <TextInput
            style={styles.levelInput}
            defaultValue={this.state.characterLevel}
            onChangeText={(text) => {
              this.setState(
                { characterLevel: parseInt(text) },
                this.setCharacterState
              );
            }}
          />
        </View>

        <View style={styles.inputRow}>
          <Text>Ascended? </Text>
          <Checkbox
            onValueChange={(value) =>
              this.setState(
                { isCharacterAscended: value },
                this.setCharacterState
              )
            }
            value={this.state.isCharacterAscended}
          />
        </View>

        <Text> </Text>

        {this.renderWeaponList()}

        <View style={styles.inputRow}>
          <Text>Level: </Text>
          <TextInput
            style={styles.levelInput}
            defaultValue={this.state.weaponLevel}
            onChangeText={(text) => {
              this.setState(
                { weaponLevel: parseInt(text) },
                this.setWeaponState
              );
            }}
          />
        </View>

        <View style={styles.inputRow}>
          <Text>Ascended? </Text>
          <Checkbox
            onValueChange={(value) =>
              this.setState({ isWeaponAscended: value }, this.setWeaponState)
            }
            value={this.state.isWeaponAscended}
          />
        </View>

        <Text> </Text>

        <Text>Artifact Sets</Text>
        {this.artifactSets.map((_, i) => this.renderArtifactSetInput(i))}

        <Text> </Text>

        <View style={styles.inputRow}>
          <Text>Attack Talent Level: </Text>
          <TextInput
            style={styles.levelInput}
            defaultValue={this.state.talentAttackLevel}
            onChangeText={(text) => {
              this.setState(
                { talentAttackLevel: parseInt(text) },
                this.setStatTalentState
              );
            }}
          />
        </View>

        <View style={styles.inputRow}>
          <Text>Skill Talent Level: </Text>
          <TextInput
            style={styles.levelInput}
            defaultValue={this.state.talentSkillLevel}
            onChangeText={(text) => {
              this.setState(
                { talentSkillLevel: parseInt(text) },
                this.setStatTalentState
              );
            }}
          />
        </View>

        <View style={styles.inputRow}>
          <Text>Burst Talent Level: </Text>
          <TextInput
            style={styles.levelInput}
            defaultValue={this.state.talentBurstLevel}
            onChangeText={(text) => {
              this.setState(
                { talentBurstLevel: parseInt(text) },
                this.setStatTalentState
              );
            }}
          />
        </View>

        <Text> </Text>

        <View style={styles.inputRow}>
          <Text>Crit: </Text>
          <ButtonGroup
            buttons={['None', 'Crit', 'Average']}
            containerStyle={styles.buttonGroupContainer}
            buttonContainerStyle={styles.buttonGroupButtonContainer}
            textStyle={styles.buttonGroupText}
            selectedButtonStyle={styles.buttonGroupSelectedButton}
            selectedTextStyle={styles.buttonGroupSelectedText}
            selectedIndex={(() => {
              if (this.state.critType === 'crit') {
                return 1;
              } else if (this.state.critType === 'average') {
                return 2;
              } else {
                return 0;
              }
            })()}
            onPress={(selectedIndex) => {
              if (selectedIndex === 1) {
                this.setState({ critType: 'crit' }, this.setAllTalentState);
              } else if (selectedIndex === 2) {
                this.setState({ critType: 'average' }, this.setAllTalentState);
              } else {
                this.setState({ critType: 'none' }, this.setAllTalentState);
              }
            }}
          />
        </View>

        <View style={styles.inputRow}>
          <Text>Enemy Level: </Text>
          <TextInput
            style={styles.levelInput}
            defaultValue={this.state.enemyLevel}
            onChangeText={(text) => {
              this.setState(
                { enemyLevel: parseInt(text) },
                this.setAllTalentState
              );
            }}
          />
        </View>

        {this.elements.map((element) => {
          return (
            <View style={styles.inputRow} key={element}>
              <Text>Enemy {statUtils.capitalize(element)} RES: </Text>
              <TextInput
                style={styles.levelInput}
                defaultValue={this.state.enemyRes[element]}
                onChangeText={(text) => {
                  this.state.enemyRes.set(element, parseFloat(text));
                  let enemyRes = this.state.enemyRes;
                  this.setState({ enemyRes }, this.setAllTalentState);
                }}
              />
              <Text>%</Text>
            </View>
          );
        })}
      </View>
    );
  };

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
              this.setState(
                {
                  characterId: value,
                  options: this.character.getOptions(),
                },
                this.setCharacterState
              );
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {this.characters.map((id) => (
            <Picker.Item
              label={data.getCharacterData(id).name}
              value={id}
              key={id}
            />
          ))}
        </Picker>
      </View>
    );
  };

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
          {this.weapons.map((id) => (
            <Picker.Item
              label={data.getWeaponData(id).name}
              value={id}
              key={id}
            />
          ))}
        </Picker>
      </View>
    );
  };

  renderArtifactSetInput = (i) => {
    return (
      <View style={styles.inputRow} key={i}>
        <Picker
          style={styles.characterSelect}
          selectedValue={this.state[`artifactSet${i + 1}Id`]}
          onValueChange={(value, _) => {
            if (value != 0) {
              this.artifactSets[i] = new ArtifactSet(value);
              this.setState(
                { [`artifactSet${i + 1}Id`]: value },
                this.setArtifactSetState
              );
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {this.artifacts.map((id) => (
            <Picker.Item
              label={data.getArtifactSetData(id).name}
              value={id}
              key={id}
            />
          ))}
        </Picker>

        <Text> : </Text>

        <TextInput
          style={styles.levelInput}
          defaultValue={this.state[`artifactSet${i + 1}Pc`]}
          onChangeText={(text) => {
            this.setState(
              { [`artifactSet${i + 1}Pc`]: parseInt(text) },
              this.setArtifactSetState
            );
          }}
        />

        <Text>pc</Text>
      </View>
    );
  };

  renderCharacterImage = () => {
    let imageUrl = `https://rerollcdn.com/GENSHIN/Characters/${this.character.name}.png`;
    return (
      <Image
        style={styles.characterImage}
        source={{ uri: imageUrl, width: 70, height: 70 }}
      />
    );
  };

  getDamageModifier = () => {
    let modifier = new DamageModifier({
      characterLevel: this.state.characterLevel,
      critType: this.state.critType,
      enemyLevel: this.state.enemyLevel,
      enemyRes: this.state.enemyRes,
      talentAttackLevel: this.state.talentAttackLevel,
      talentSkillLevel: this.state.talentSkillLevel,
      talentBurstLevel: this.state.talentBurstLevel,
      options: this.state.options,
    });

    return modifier;
  };

  setCharacterState = () => {
    if (this.character !== undefined) {
      let stats = this.character.getInnateStatsAt(
        this.state.characterLevel,
        this.state.isCharacterAscended
      );
      let totalStats = this.getTotalStats();
      let modifier = this.getDamageModifier();

      let talentAttackDamage = this.character.getTalentDamageAt({
        type: 'Attack',
        talentLevel: this.state.talentAttackLevel,
        totalStats,
        modifier,
      });

      let talentSkillDamage = this.character.getTalentDamageAt({
        type: 'Skill',
        talentLevel: this.state.talentSkillLevel,
        totalStats,
        modifier,
      });

      let talentBurstDamage = this.character.getTalentDamageAt({
        type: 'Burst',
        talentLevel: this.state.talentBurstLevel,
        totalStats,
        modifier,
      });

      this.setState({
        characterStats: stats,
        totalStats: totalStats,
        talentAttackDamage: talentAttackDamage,
        talentSkillDamage: talentSkillDamage,
        talentBurstDamage: talentBurstDamage,
      });
    }
  };

  setWeaponState = () => {
    if (this.weapon !== undefined) {
      let stats = this.weapon.getStatsAt(
        this.state.weaponLevel,
        this.state.isweaponAscended
      );
      let totalStats = this.getTotalStats();
      let modifier = this.getDamageModifier();

      let talentAttackDamage, talentSkillDamage, talentBurstDamage;
      if (this.character !== undefined) {
        talentAttackDamage = this.character.getTalentDamageAt({
          type: 'Attack',
          talentLevel: this.state.talentAttackLevel,
          totalStats,
          modifier,
        });

        talentSkillDamage = this.character.getTalentDamageAt({
          type: 'Skill',
          talentLevel: this.state.talentSkillLevel,
          totalStats,
          modifier,
        });

        talentBurstDamage = this.character.getTalentDamageAt({
          type: 'Burst',
          talentLevel: this.state.talentBurstLevel,
          totalStats,
          modifier,
        });
      }

      this.setState({
        weaponStats: stats,
        totalStats: totalStats,
        talentAttackDamage: talentAttackDamage,
        talentSkillDamage: talentSkillDamage,
        talentBurstDamage: talentBurstDamage,
      });
    }
  };

  setArtifactSetState = () => {
    if (!this.artifactSets.every((value) => value === 0)) {
      this.artifactSetStats = this.artifactSets.reduce((acc, set, i) => {
        if (set !== 0) {
          let setStats = set.getStatsAt(this.state[`artifactSet${i + 1}Pc`]);
          Object.entries(setStats).forEach(([stat, value]) => {
            if (acc[stat] !== undefined) {
              acc[stat] += value;
            } else {
              acc[stat] = value;
            }
          });
          return acc;
        } else {
          return acc;
        }
      }, {});

      this.setStatTalentState();
    }
  };

  setStatTalentState = (type) => {
    let totalStats = this.getTotalStats();
    let modifier = this.getDamageModifier();

    let talentAttackDamage, talentSkillDamage, talentBurstDamage;
    if (this.character !== undefined) {
      talentAttackDamage = this.character.getTalentDamageAt({
        type: 'Attack',
        talentLevel: this.state.talentAttackLevel,
        totalStats,
        modifier,
      });

      talentSkillDamage = this.character.getTalentDamageAt({
        type: 'Skill',
        talentLevel: this.state.talentSkillLevel,
        totalStats,
        modifier,
      });

      talentBurstDamage = this.character.getTalentDamageAt({
        type: 'Burst',
        talentLevel: this.state.talentBurstLevel,
        totalStats,
        modifier,
      });
    }

    this.setState({
      totalStats: totalStats,
      talentAttackDamage: talentAttackDamage,
      talentSkillDamage: talentSkillDamage,
      talentBurstDamage: talentBurstDamage,
    });
  };

  setTalentState = (type) => {
    if (this.character !== undefined) {
      let talentDmg = this.character.getTalentDamageAt({
        type,
        talentLevel: this.state[`talent${type}Level`],
        totalStats: this.state.totalStats,
        modifier: this.getDamageModifier(),
      });

      this.setState({ [`talent${type}Damage`]: talentDmg });
    }
  };

  // Not used in setCharacterState, setWeaponState, or setArtifactState to reduce number of setState calls
  // Does not call setTalentState to reduce number of setState calls
  setAllTalentState = () => {
    if (this.character !== undefined) {
      let talentAttackDamage = this.character.getTalentDamageAt({
        type: 'Attack',
        talentLevel: this.state.talentAttackLevel,
        totalStats: this.state.totalStats,
        modifier: this.getDamageModifier(),
      });

      let talentSkillDamage = this.character.getTalentDamageAt({
        type: 'Skill',
        talentLevel: this.state.talentSkillLevel,
        totalStats: this.state.totalStats,
        modifier: this.getDamageModifier(),
      });

      let talentBurstDamage = this.character.getTalentDamageAt({
        type: 'Burst',
        talentLevel: this.state.talentBurstLevel,
        totalStats: this.state.totalStats,
        modifier: this.getDamageModifier(),
      });

      this.setState({
        talentAttackDamage: talentAttackDamage,
        talentSkillDamage: talentSkillDamage,
        talentBurstDamage: talentBurstDamage,
      });
    }
  };

  getTotalStats = () => {
    let artifacts = [
      this.artifactFlower,
      this.artifactFeather,
      this.artifactSands,
      this.artifactGoblet,
      this.artifactCirclet,
    ];

    let stats = statUtils.getTotalStatsAt(
      this.weapon,
      this.state.weaponLevel,
      this.state.isWeaponAscended,
      this.character,
      this.state.characterLevel,
      this.state.isCharacterAscended,
      this.artifactSetStats,
      artifacts,
      this.state.talentAttackLevel,
      this.state.talentSkillLevel,
      this.state.talentBurstLevel,
      this.state.options
    );

    return stats;
  };

  renderCharacterStats = () => {
    return this.character ? (
      <View style={styles.resultBlock}>
        <Text style={styles.titleText}>Character</Text>
        {this.renderCharacterImage()}
        <Text style={styles.resultText}>
          {this.character ? this.character.name : ''}
        </Text>
        {this.state.characterStats
          ? Object.entries(this.state.characterStats).map(([stat, value]) => {
              return (
                <Text style={styles.resultText} key={stat}>
                  {data.propMapping[stat].name}:{' '}
                  {statUtils.getStatDisplayValue(
                    value,
                    data.propMapping[stat].isPercentage
                  )}
                </Text>
              );
            })
          : null}
      </View>
    ) : null;
  };

  renderWeaponStats = () => {
    return this.weapon ? (
      <View style={styles.resultBlock}>
        <Text style={styles.titleText}>Weapon</Text>
        <Text style={styles.resultText}>
          {this.weapon ? this.weapon.name : ''}
        </Text>
        {this.state.weaponStats
          ? Object.entries(this.state.weaponStats).map(([stat, value]) => {
              return (
                <Text style={styles.resultText} key={stat}>
                  {data.propMapping[stat].name}:{' '}
                  {statUtils.getStatDisplayValue(
                    value,
                    data.propMapping[stat].isPercentage
                  )}
                </Text>
              );
            })
          : null}
      </View>
    ) : null;
  };

  renderArtifactSetStats = () => {
    let stats = this.artifactSetStats;

    return stats ? (
      <View style={styles.resultBlock}>
        <Text style={styles.titleText}>Artifact Sets</Text>
        {Object.entries(stats).map(([stat, value]) => {
          return (
            <Text style={styles.resultText} key={stat}>
              {data.propMapping[stat].name}:{' '}
              {statUtils.getStatDisplayValue(
                value,
                data.propMapping[stat].isPercentage
              )}
            </Text>
          );
        })}
      </View>
    ) : null;
  };

  renderArtifactMainStat = (type) => {
    return (
      <View style={styles.inputRow}>
        <Picker
          selectedValue={this['artifact' + type].mainStat.stat}
          onValueChange={(stat, _) => {
            if (stat != 0) {
              let mainStat = this['artifact' + type].mainStat;
              this['artifact' + type].setStat(
                mainStat,
                stat,
                undefined,
                data.propMapping[stat].isPercentage
              );
              // Update total stats
              this.setStatTalentState(type);
            }
          }}
        >
          <Picker.Item label='' value={0} />
          {mainStatProps[type].map((prop) => (
            <Picker.Item
              label={data.propMapping[prop].name}
              value={prop}
              key={prop}
            />
          ))}
        </Picker>

        <Text> : </Text>

        <TextInput
          style={styles.statInput}
          onChangeText={(text) => {
            let mainStat = this['artifact' + type].mainStat;
            if (mainStat.stat) {
              this['artifact' + type].setStat(
                mainStat,
                undefined,
                parseFloat(text),
                data.propMapping[mainStat.stat].isPercentage
              );
            } else {
              // If stat type is not yet set
              this['artifact' + type].setStat(
                mainStat,
                undefined,
                parseFloat(text),
                false
              );
            }

            // Update total stats
            this.setStatTalentState(type);
          }}
        />
      </View>
    );
  };

  renderArtifactSubStats = (type) => {
    return (
      <View>
        {this['artifact' + type].subStats.map((subStat, index) => {
          return (
            <View style={styles.inputRow} key={index}>
              <Picker
                selectedValue={subStat.stat}
                onValueChange={(stat, _) => {
                  if (stat != 0) {
                    this['artifact' + type].setStat(
                      subStat,
                      stat,
                      undefined,
                      data.propMapping[stat].isPercentage
                    );
                    // Update total stats
                    this.setStatTalentState(type);
                  }
                }}
              >
                <Picker.Item label='' value={0} />
                {subStatProps.map((prop) => (
                  <Picker.Item
                    label={data.propMapping[prop].name}
                    value={prop}
                    key={prop}
                  />
                ))}
              </Picker>

              <Text> : </Text>

              <TextInput
                style={styles.statInput}
                onChangeText={(text) => {
                  let stat = subStat.stat;
                  if (stat) {
                    this['artifact' + type].setStat(
                      subStat,
                      undefined,
                      parseFloat(text),
                      data.propMapping[stat].isPercentage
                    );
                  } else {
                    // If stat type is not yet set
                    this['artifact' + type].setStat(
                      subStat,
                      undefined,
                      parseFloat(text),
                      false
                    );
                  }
                  // Update total stats
                  this.setStatTalentState(type);
                }}
              />
            </View>
          );
        })}
      </View>
    );
  };

  renderArtifactStat = (type, isLast = false) => {
    return (
      <View
        style={isLast ? styles.artifactBlockNoBorder : styles.artifactBlock}
      >
        <Text style={styles.artifactType}>{type}</Text>

        <Text style={styles.artifactStatType}>Main Stat</Text>
        {this.renderArtifactMainStat(type)}

        <Text style={styles.artifactStatType}>Substats</Text>
        {this.renderArtifactSubStats(type)}
      </View>
    );
  };

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
    );
  };

  renderTotalStats = () => {
    return (
      <View style={styles.resultBlockNoBorder}>
        <Text style={styles.titleText}>Stat Total</Text>
        {this.state.totalStats
          ? Object.entries(this.state.totalStats).map(([stat, value]) => {
              if (stat != 'baseAtk') {
                return (
                  <Text style={styles.resultText} key={stat}>
                    {data.propMapping[stat].name}:{' '}
                    {statUtils.getStatDisplayValue(
                      value,
                      data.propMapping[stat].isPercentage
                    )}
                  </Text>
                );
              } else {
                return null;
              }
            })
          : null}
      </View>
    );
  };

  renderTalentDamage = (type, isLast = false) => {
    return (
      <View
        style={isLast ? styles.artifactBlockNoBorder : styles.artifactBlock}
      >
        <Text style={styles.artifactType}>{type}</Text>
        {this.state['talent' + type + 'Damage']
          ? this.state['talent' + type + 'Damage'].map(
              ({ description, damage }, index) => {
                return (
                  <Text style={styles.resultText} key={index}>
                    {statUtils.getTalentDescription(description)}:{' '}
                    {statUtils.getDamageDisplayValue(damage)}
                  </Text>
                );
              }
            )
          : null}
      </View>
    );
  };

  renderOptions = () => {
    return (
      <FlatList
        data={this.state.options}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          if (item.type === 'boolean') {
            return (
              <View style={styles.inputRow}>
                <Text>{statUtils.getOptionName(item.id)}: </Text>
                <Checkbox
                  onValueChange={(value) => {
                    let options = [...this.state.options];
                    options[index] = options[index].withValue(value);
                    this.setState({ options }, this.setStatTalentState);
                  }}
                  value={item.value}
                />
              </View>
            );
          } else {
            return null;
          }
        }}
      />
    );
  };

  renderAllTalentDamage = () => {
    return (
      <View style={styles.resultBlockNoBorder}>
        <Text style={styles.titleText}>Talents</Text>

        {this.renderTalentDamage('Attack')}
        {this.renderTalentDamage('Skill')}
        {this.renderTalentDamage('Burst', true)}
        {this.renderOptions()}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputColumn}>{this.renderInputColumn()}</View>

        <View style={styles.resultColumn}>
          {this.renderCharacterStats()}
          {this.renderWeaponStats()}
          {this.renderArtifactSetStats()}
          {this.renderAllArtifactStats()}
        </View>

        <View style={styles.resultColumn}>{this.renderTotalStats()}</View>

        <View style={styles.resultColumn}>{this.renderAllTalentDamage()}</View>

        <View style={styles.fillerColumn}></View>
      </View>
    );
  }
}
