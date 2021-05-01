export default class TalentOption {
    constructor(id, type = 'boolean', value, isActivated = false) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.isActivated = isActivated;
    }
}

export const dilucTalentOptions = [new TalentOption('infusion', 'boolean', 'pyro', false)];