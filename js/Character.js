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

    async getStatsWithWeaponAt(weapon, weaponLevel, weaponHasAscended, dbWeaponStatCurveColRef, characterLevel, characterHasAscended, dbCharStatCurveColRef) {

        let weaponStats;
        if (weapon !== undefined) {
            weaponStats = await weapon.getStatsAt(weaponLevel, weaponHasAscended, dbWeaponStatCurveColRef);
        } else {
            weaponStats = {
                baseHp: null,
                baseAtk: null,
                baseDef: null,
            };
        }

        let innateStats = await this.getStatsAt(characterLevel, characterHasAscended, dbCharStatCurveColRef);
        
        return {
            InnateHp: innateStats.baseHp,
            InnateAtk: innateStats.baseAtk,
            InnateDef: innateStats.baseDef,
            WeaponHp: weaponStats.baseHp,
            WeaponAtk: weaponStats.baseAtk,
            WeaponDef: weaponStats.baseDef,
        };
    }

    // Returns an Object containing the character's innate total HP, Atk and Def, taking into account only their level and ascension
    async getStatsAt(level, hasAscended, dbStatCurveColRef) {
        if (isNaN(level) || level < 1 || level > 90) {
            // Return nulls if level is invalid
            let innateStats = {
                baseHp: null,
                baseAtk: null,
                baseDef: null,
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
            let innateStats = {
                baseHp: this.baseStats.baseHp,
                baseAtk: this.baseStats.baseAtk,
                baseDef: this.baseStats.baseDef,
            }

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
                    innateStats[stat] += bonus;
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

