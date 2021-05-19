export default class TalentOption {
    constructor(id, type = 'boolean', value) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
}

// Diluc
export const dilucTalentOptions = [new TalentOption('infusion', 'boolean', false)];

// Xiao
export const xiaoTalentOptions = [new TalentOption('infusion', 'boolean', false)];

// Noelle
export const noelleTalentOptions = [new TalentOption('infusion', 'boolean', false)];

// Chongyun
export const chongyunTalentOptions = [new TalentOption('infusion', 'boolean', false)];

// Hu Tao
export const hutaoTalentOptions = [new TalentOption('infusion', 'boolean', false)];

// Yanfei
export const yanfeiTalentOptions = [new TalentOption('brilliance', 'boolean', false)];
