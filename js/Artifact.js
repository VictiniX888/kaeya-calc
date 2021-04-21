export default class Artifact {
    mainStat = {
        stat: 0,
        value: '',
    };

    subStats = [
        {
            stat: 0,
            value: '',
        }, 
        {
            stat: 0,
            value: '',
        }, 
        {
            stat: 0,
            value: '',
        }, 
        {
            stat: 0,
            value: '',
        }
    ];

    constructor(type) {
        this.type = type;
        if (type == 'Flower') {
            this.mainStat.stat = 'flatHp';
        } else if (type == 'Feather') {
            this.mainStat.stat = 'flatAtk';
        }
    }

    // Will normally only be called with one of the two of stat and value (the other will be undefined)
    setStat(statObj, stat, value) {
        if (stat == undefined && value != undefined) {
            statObj.value = value;
        } else if (value == undefined && stat != undefined) {
            statObj.stat = stat;
            statObj.value = '';
        } else if (value != undefined && stat != undefined) {
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

        if (this.mainStat.stat != 0 && !isNaN(parseInt(this.mainStat.value))) {
            stats[this.mainStat.stat] = parseInt(this.mainStat.value);
        }
        
        this.subStats.forEach(subStat => {
            if (subStat.stat != 0 && !isNaN(parseInt(subStat.value))) {
                stats[subStat.stat] = parseInt(subStat.value);
            }
        })

        return stats;
    }
}

export const mainStatProps = {
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