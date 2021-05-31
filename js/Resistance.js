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
    this.anemo = anemo;
    this.cryo = cryo;
    this.electro = electro;
    this.geo = geo;
    this.hydro = hydro;
    this.pyro = pyro;
    this.physical = physical;
  }

  set(type, value) {
    if (!isNaN(value)) {
      this[type] = value;
    } else {
      this[type] = 0;
    }
  }

  add(type, value) {
    if (!isNaN(value)) {
      this[type] += value;
    }
  }
}
