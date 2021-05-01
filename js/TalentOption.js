export default class TalentOption {
    constructor(description, type = 'boolean', value, isActivated = false) {
        this.description = description;
        this.type = type;
        this.value = value;
        this.isActivated = isActivated;
    }
}

export const dilucTalentOptions = [new TalentOption('infusion', 'boolean', 'pyro', false)];