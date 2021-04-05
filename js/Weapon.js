class Weapon {
    constructor(name, type, rank) {
        this.name = name;
        this.type = type;
        this.rank = rank;
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

    // Returns an Object containing the weapons's HP, Atk and Def, taking into account only its level and ascension
    async getStatsAt(weaponLevel, hasAscended, dbStatCurveColRef) {
        if (isNaN(weaponLevel) || weaponLevel < 1 || (this.rank <= 2 && weaponLevel > 70) || weaponLevel > 90) {
            // Return nulls if weapon level is invalid
            let weaponStats;
            if (this.stats !== undefined) {
                // Copy all of stats' properties to a new object and initialize them to null
                weaponStats = Object.keys(this.stats).reduce((obj, stat) => {
                    obj[stat] = null;
                    return obj;
                }, {});
            } else {
                weaponStats = {};
            }
            
            this.stats = weaponStats;
            this.weaponLevel = weaponLevel;
            this.hasAscended = hasAscended;

            return weaponStats;
        }
        // If getStatsAt has not been called before, this.weaponLevel, this.hasAscended, and this.stats will be undefined
        else if (weaponLevel === this.weaponLevel && hasAscended === this.hasAscended) {
            // Don't recalculate stats if it has been calculated with the same parameters before
            return this.stats;
        } else {

            // Level 1 weapon stats
            let weaponStats = {...this.baseStats};

            let weaponStatCurves = await this.getStatCurvesAtLevel(weaponLevel, dbStatCurveColRef);

            // Calculate stats from weapon level
            Object.entries(this.statCurveMapping).forEach(([stat, curve]) => {
                let multiplier = weaponStatCurves[curve];
                weaponStats[stat] *= multiplier;
            });

            // Calculate stats from weapon ascension
            let ascensionLevel;
            // Only 3-star and above weapons can be ascended beyond level 70
            if (this.rank > 2 && (weaponLevel > 80 || (weaponLevel == 80 && hasAscended))) {
                ascensionLevel = 6;
            } else if (this.rank > 2 && (weaponLevel > 70 || (weaponLevel == 70 && hasAscended))) {
                ascensionLevel = 5;
            } else if (weaponLevel > 60 || (weaponLevel == 60 && hasAscended)) {
                ascensionLevel = 4;
            } else if (weaponLevel > 50 || (weaponLevel == 50 && hasAscended)) {
                ascensionLevel = 3;
            } else if (weaponLevel > 40 || (weaponLevel == 40 && hasAscended)) {
                ascensionLevel = 2;
            } else if (weaponLevel > 20 || (weaponLevel == 20 && hasAscended)) {
                ascensionLevel = 1;
            } else {
                ascensionLevel = 0;
            }
            let ascensionBonuses = this.ascensionBonuses[ascensionLevel];
            
            if (ascensionBonuses !== undefined) {
                Object.entries(ascensionBonuses).forEach(([stat, bonus]) => {
                    if (stat in weaponStats) {
                        weaponStats[stat] += bonus;
                    } else {
                        weaponStats[stat] = bonus;
                    }
                })
            }

            this.stats = weaponStats;
            this.weaponLevel = weaponLevel;
            this.hasAscended = hasAscended;

            return weaponStats;
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

export const weaponConverter = {
    fromFirestore: async (snapshot, options) => {
        const data = snapshot.data(options);
        let weapon = await createWeapon(
            data.name,
            data.type,
            data.rank,
            snapshot.ref.collection('stats').doc('baseStats'),
            snapshot.ref.collection('stats').doc('statCurves'), 
            snapshot.ref.collection('ascensionBonuses'),
        );

        return weapon;
    }
}

async function createWeapon(name, type, rank, dbBaseStatRef, dbStatCurveRef, dbAscensionBonusRef) {
    let weapon = new Weapon(name, type, rank);
    await weapon.setBaseStats(dbBaseStatRef);
    await weapon.setStatCurveMapping(dbStatCurveRef);
    await weapon.setAscensionBonuses(dbAscensionBonusRef);

    return weapon;
}