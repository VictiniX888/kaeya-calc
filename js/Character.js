class Character {
    constructor(name) {
        this.name = name;
    }

    async setBaseStats(dbBaseStatRef) {
        let doc = await dbBaseStatRef.get()
        
        if (doc.exists) {
            this.baseStats = doc.data();
        } else {
            // doc.data() is undefined
            console.log(`WARN: Base stats for ${this.name} not found!`);
        }
    }

    async setStatCurveMapping(dbStatCurveRef) {
        let doc = await dbStatCurveRef.get()

        if (doc.exists) {
            this.statCurveMapping = doc.data();
        } else {
            // doc.data() is undefined
            console.log(`WARN: Stat curve mapping for ${this.name} not found!`);
        }
    }

    async setAscensionBonuses(dbAscensionBonusRef) {
        this.ascensionBonuses = {};
        
        let querySnapshot = await dbAscensionBonusRef.get()
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            this.ascensionBonuses[doc.id] = doc.data();
        })
    }



    // Returns object containing base stats of character with the passed weapon
    // Base stats = character innate stats + weapon stats
    async getBaseStatsAt(weapon, weaponLevel, weaponHasAscended, dbWeaponStatCurveColRef, characterLevel, characterHasAscended, dbCharStatCurveColRef) {

        let weaponStats = await this.getWeaponStatsAt(weapon, weaponLevel, weaponHasAscended, dbWeaponStatCurveColRef)

        let innateStats = await this.getInnateStatsAt(characterLevel, characterHasAscended, dbCharStatCurveColRef);
        
        // Merges weaponStats and innateStats into a new baseStats object
        let baseStats = {...weaponStats};
        Object.entries(innateStats).map(([stat, value]) => {
            if (baseStats[stat] === undefined) {
                baseStats[stat] = value;
            } else {
                baseStats[stat] += value;
            }
        });
        
        return baseStats;
    }

    async getWeaponStatsAt(weapon, weaponLevel, weaponHasAscended, dbWeaponStatCurveColRef) {
        let weaponStats;
        if (weapon !== undefined) {
            weaponStats = await weapon.getStatsAt(weaponLevel, weaponHasAscended, dbWeaponStatCurveColRef);
        } else {
            weaponStats = {};
        }

        return weaponStats;
    }

    // Returns an Object containing the character's innate total HP, Atk and Def, taking into account only their level and ascension
    async getInnateStatsAt(level, hasAscended, dbStatCurveColRef) {
        if (isNaN(level) || level < 1 || level > 90) {
            // Return nulls if level is invalid
            let innateStats;
            if (this.innateStats !== undefined) {
                // Copy all of innateStats' properties to a new object and initialize them to null
                innateStats = Object.keys(this.innateStats).reduce((obj, stat) => {
                    obj[stat] = null;
                    return obj;
                }, {});
            } else {
                innateStats = {};
            }
            
            this.innateStats = innateStats;
            this.level = level;
            this.hasAscended = hasAscended;
            
            return innateStats;
        } 
        // If getStatsAt has not been called before, this.level, this.hasAscended, and this.stats will be undefined
        else if (level === this.level && hasAscended === this.hasAscended) {
            // Don't recalculate stats if it has been calculated with the same parameters before
            return this.innateStats;
        } else {

            // Initialize stats with character level 1 base stats
            let innateStats = {...this.baseStats};

            let charStatCurves = await this.getStatCurvesAtLevel(level, dbStatCurveColRef);

            // Calculate stats from character level
            Object.entries(this.statCurveMapping).forEach(([stat, curve]) => {
                let multiplier = charStatCurves[curve];
                innateStats[stat] *= multiplier;
            });

            // Calculate stats from character ascension
            let ascensionLevel;
            if (level > 80 || (level == 80 && hasAscended)) {
                ascensionLevel = 6;
            } else if (level > 70 || (level == 70 && hasAscended)) {
                ascensionLevel = 5;
            } else if (level > 60 || (level == 60 && hasAscended)) {
                ascensionLevel = 4;
            } else if (level > 50 || (level == 50 && hasAscended)) {
                ascensionLevel = 3;
            } else if (level > 40 || (level == 40 && hasAscended)) {
                ascensionLevel = 2;
            } else if (level > 20 || (level == 20 && hasAscended)) {
                ascensionLevel = 1;
            } else {
                ascensionLevel = 0;
            }
            let ascensionBonuses = this.ascensionBonuses[ascensionLevel];

            if (ascensionBonuses !== undefined) {
                Object.entries(ascensionBonuses).forEach(([stat, bonus]) => {
                    if (stat in innateStats) {
                        innateStats[stat] += bonus;
                    } else {
                        innateStats[stat] = bonus;
                    }
                })
            }

            this.innateStats = innateStats;
            this.level = level;
            this.hasAscended = hasAscended;

            return innateStats;
        }
    }

    async getStatCurvesAtLevel(level, dbStatCurveColRef) {
        let doc = await dbStatCurveColRef.doc(level.toString()).get();
        if (doc.exists) {
            return doc.data();
        } else {
            console.log(`WARN: Stat curves for level ${level} not found`);
            return {};
        }
    }
}

export const characterConverter = {
    fromFirestore: async (snapshot, options) => {
        const data = snapshot.data(options);
        let chararcter = await createCharacter(
            data.name,
            snapshot.ref.collection('stats').doc('baseStats'),
            snapshot.ref.collection('stats').doc('statCurves'), 
            snapshot.ref.collection('ascensionBonuses'),
        );

        return chararcter;
    }
}

async function createCharacter(name, dbBaseStatRef, dbStatCurveRef, dbAscensionBonusRef) {
    let character = new Character(name);
    await character.setBaseStats(dbBaseStatRef);
    await character.setStatCurveMapping(dbStatCurveRef);
    await character.setAscensionBonuses(dbAscensionBonusRef);

    return character;
}

// Returns object containing the total stats of the character, weapon and artifacts
// Ignores any of [character, weapon] that are undefined
export async function getTotalStatsAt(weapon, weaponLevel, weaponHasAscended, dbWeaponStatCurveColRef, character, characterLevel, characterHasAscended, dbCharStatCurveColRef, artifacts) {
    
    let baseStats;
    if (character === undefined) {
        if (weapon === undefined) {
            baseStats = {};
        } else {
            baseStats = await weapon.getStatsAt(weaponLevel, weaponHasAscended, dbWeaponStatCurveColRef);
        }
    } else {
        baseStats = await character.getBaseStatsAt(weapon, weaponLevel, weaponHasAscended, dbWeaponStatCurveColRef, characterLevel, characterHasAscended, dbCharStatCurveColRef);
    }
    
    // Merge artifact bonuses into separate object
    let artifactStats = {};
    artifacts.forEach(artifact => {
        Object.entries(artifact.getStats()).forEach(([stat, value]) => {
            if (artifactStats[stat] === undefined) {
                artifactStats[stat] = value;
            } else {
                artifactStats[stat] += value;
            }
        });
    });

    // Merge base stats and artifact bonuses
    let combinedStats = {...baseStats};
    Object.entries(artifactStats).forEach(([stat, value]) => {
        if (combinedStats[stat] === undefined) {
            combinedStats[stat] = value;
        } else {
            combinedStats[stat] += value;
        }
    });

    // Calculate total stats
    let totalStats = {};
    totalStats.flatAtk = (combinedStats.baseAtk ? combinedStats.baseAtk : 0) 
        * (1 + (combinedStats.atkBonus ? combinedStats.atkBonus : 0))
        + (combinedStats.flatAtk ? combinedStats.flatAtk : 0);
    totalStats.flatDef = (combinedStats.baseDef ? combinedStats.baseDef : 0) 
        * (1 + (combinedStats.defBonus ? combinedStats.defBonus : 0))
        + (combinedStats.flatDef ? combinedStats.flatDef : 0);
    totalStats.flatHp = (combinedStats.baseHp ? combinedStats.baseHp : 0) 
        * (1 + (combinedStats.hpBonus ? combinedStats.hpBonus : 0))
        + (combinedStats.flatHp ? combinedStats.flatHp : 0);
    totalStats.critRate = combinedStats.critRate ? combinedStats.critRate : 0;
    totalStats.critDmg = combinedStats.critDmg ? combinedStats.critDmg : 0;
    totalStats.elementalMastery = combinedStats.elementalMastery ? combinedStats.elementalMastery : 0;
    totalStats.energyRecharge = 1 + (combinedStats.energyRecharge ? combinedStats.energyRecharge : 0);
    
    combinedStats.anemoDmgBonus ? totalStats.anemoDmgBonus = combinedStats.anemoDmgBonus : null;
    combinedStats.cryoDmgBonus ? totalStats.cryoDmgBonus = combinedStats.cryoDmgBonus : null;
    combinedStats.electroDmgBonus ? totalStats.electroDmgBonus = combinedStats.electroDmgBonus : null;
    combinedStats.geoDmgBonus ? totalStats.geoDmgBonus = combinedStats.geoDmgBonus : null;
    combinedStats.hydroDmgBonus ? totalStats.hydroDmgBonus = combinedStats.hydroDmgBonus : null;
    combinedStats.pyroDmgBonus ? totalStats.pyroDmgBonus = combinedStats.pyroDmgBonus : null;
    combinedStats.physicalDmgBonus ? totalStats.physicalDmgBonus = combinedStats.physicalDmgBonus : null;

    combinedStats.anemoRes ? totalStats.anemoRes = combinedStats.anemoRes : null;
    combinedStats.cryoRes ? totalStats.cryoRes = combinedStats.cryoRes : null;
    combinedStats.electroRes ? totalStats.electroRes = combinedStats.electroRes : null;
    combinedStats.geoRes ? totalStats.geoRes = combinedStats.geoRes : null;
    combinedStats.hydroRes ? totalStats.hydroRes = combinedStats.hydroRes : null;
    combinedStats.pyroRes ? totalStats.pyroRes = combinedStats.pyroRes : null;
    combinedStats.physicalRes ? totalStats.physicalRes = combinedStats.physicalRes : null;

    combinedStats.healingBonus ? totalStats.healingBonus = combinedStats.healingBonus : null;

    return totalStats;
}