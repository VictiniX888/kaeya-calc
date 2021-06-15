import { Element } from './talent/types';

export default class Resistance {
  private _resistance: Map<Element, number>;

  constructor({
    anemo = 0,
    cryo = 0,
    electro = 0,
    geo = 0,
    hydro = 0,
    pyro = 0,
    physical = 0,
  } = {}) {
    this._resistance = new Map();
    this._resistance.set(Element.Anemo, anemo);
    this._resistance.set(Element.Cryo, cryo);
    this._resistance.set(Element.Electro, electro);
    this._resistance.set(Element.Geo, geo);
    this._resistance.set(Element.Hydro, hydro);
    this._resistance.set(Element.Pyro, pyro);
    this._resistance.set(Element.Physical, physical);
  }

  get(element: Element) {
    return this._resistance.get(element) ?? NaN;
  }

  set(element: Element, value: number) {
    this._resistance.set(element, value);
  }

  add(element: Element, value: number) {
    if (!isNaN(value)) {
      const prevValue = this._resistance.get(element) ?? 0;
      this._resistance.set(element, prevValue + value);
    }
  }
}
