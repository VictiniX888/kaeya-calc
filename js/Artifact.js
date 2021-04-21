export default class Artifact {
    mainStat = {
        stat: 0,
        value: NaN,
    };

    subStats = [
        {
            stat: 0,
            value: NaN,
        }, 
        {
            stat: 0,
            value: NaN,
        }, 
        {
            stat: 0,
            value: NaN,
        }, 
        {
            stat: 0,
            value: NaN,
        }
    ];

    constructor(type) {
        this.type = type;
    }

    // Should normally only be called with one of the two of stat and value (the other will be undefined)
    setStat(statObj, stat, value) {
        if (stat == undefined && value != undefined) {
            statObj.value = value;
        } else if (stat != undefined && value == undefined) {
            // Unused
            statObj.stat = stat;
        } else if (stat != undefined && value != undefined) {
            statObj.stat = stat;
            statObj.value = value;
        }
    }

    setMainStat(stat, value) {
        this.setStat(this.mainStat, stat, value);
    }

    // Set substat in a spefiic position
    setSubStat(pos, stat, value) {
        this.setStat(this.subStats[pos], stat, value);
    }

    // Returns object containing stat: value mapping, including both main stat and substats
    getStats() {
        let stats = {};

        if (this.mainStat.stat != 0) {
            if (!isNaN(this.mainStat.value)) {
                stats[this.mainStat.stat] = this.mainStat.value;
            } else {
                stats[this.mainStat.stat] = null;
            }
        }
        
        this.subStats.forEach(subStat => {
            if (subStat.stat != 0) {
                if (!isNaN(subStat.value)) {
                    stats[subStat.stat] = subStat.value;
                } else {
                    stats[subStat.stat] = null;
                }
            }
        });

        return stats;
    }
}

export const mainStatProps = {
    Flower: [
        'flatHp',
    ],

    Feather: [
        'flatAtk',
    ],

    Sands: [
        'hpBonus',
        'atkBonus',
        'defBonus',
        'elementalMastery',
        'energyRecharge',
    ],

    Goblet: [
        'hpBonus',
        'atkBonus',
        'defBonus',
        'elementalMastery',
        'anemoDmgBonus',
        'cryoDmgBonus',
        'electroDmgBonus',
        'geoDmgBonus',
        'hydroDmgBonus',
        'pyroDmgBonus',
        'physicalDmgBonus',
    ],

    Circlet: [
        'hpBonus',
        'atkBonus',
        'defBonus',
        'elementalMastery',
        'critRate',
        'critDmg',
        'healingBonus',
    ],
}