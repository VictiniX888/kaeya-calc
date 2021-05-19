export default class Resistance {
    constructor({
        anemo = 0,
        cryo = 0,
        electro = 0,
        geo = 0,
        hydro = 0,
        pyro = 0,
        physical = 0,
    }) {
        this.anemo = anemo / 100;
        this.cryo = cryo / 100;
        this.electro = electro / 100;
        this.geo = geo / 100;
        this.hydro = hydro / 100;
        this.pyro = pyro / 100;
        this.physical = physical / 100;
    }

    set(type, value) {
        if (!isNaN(value)) {
            this[type] = value / 100;
        } else {
            this[type] = 0;
        }
    }

    add(type, value) {
        if (!isNaN(value)) {
            this[type] += value / 100;
        }
    }
}