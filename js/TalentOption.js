export default class TalentOption {
    constructor(id, type = 'boolean', value) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
}

// Diluc
export const dilucTalentOptions = [new TalentOption('infusion', 'boolean', false)];