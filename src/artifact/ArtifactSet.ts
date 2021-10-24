import { getArtifactSetData, getArtifactSetBonusData } from '../data/Data';
import { artifactSetBonuses as extraBonuses } from './ArtifactSetBonus';
import {
  ArtifactSetBonusData,
  ArtifactSetBonusSet,
  Stats,
} from '../data/types';
import { ArtifactSetOption } from '../option/artifactSetOptions';
import { ModifierMixin, StatMixin } from '../option/Mixin';
import { ArtifactSetBonus } from './types';

export default class ArtifactSet {
  constructor(id: string, pieces?: number) {
    if (pieces !== undefined) this._pieces = pieces;
    this.id = id;
  }

  private _id: string = '';
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    // Essentially replaces the constructor
    this._id = value;

    const data = getArtifactSetData(value);
    this.name = data?.name;
    this.bonusThresholds = data?.bonusThresholds;

    this.setBonusData = getArtifactSetBonusData(value);

    this.setBonusSets = this.getSetBonusSetsAt(this.pieces);
    this.stats = this.getStats();
    this.setBonuses = this.getSetBonuses();
    this.options = this.getOptions(this.pieces);
  }

  name?: string;
  bonusThresholds?: number[];
  setBonusData?: ArtifactSetBonusData;

  private _pieces: number = 0;
  get pieces(): number {
    return this._pieces;
  }
  set pieces(value: number) {
    const prevPieces = this.pieces;
    this._pieces = value;

    this.setBonusSets = this.getSetBonusSetsAt(this.pieces);
    this.stats = this.getStats();
    this.setBonuses = this.getSetBonuses();
    this.options = this.getOptions(this.pieces, prevPieces);
  }

  options: ArtifactSetOption[] = [];
  stats: Stats = {};
  setBonusSets: ArtifactSetBonusSet[] = [];
  setBonuses: ArtifactSetBonus[] = [];

  getSetBonusSetsAt(pieces: number): ArtifactSetBonusSet[] {
    if (this.bonusThresholds === undefined) return [];

    return this.bonusThresholds
      .filter((threshold) => pieces >= threshold)
      .map((threshold) => this.setBonusData?.[threshold])
      .filter((bonus): bonus is ArtifactSetBonusSet => bonus !== undefined);
  }

  getStats() {
    let stats: Stats = {};

    let setBonuses = this.setBonusSets;
    setBonuses?.forEach((setBonus) => {
      // Normal stat bonuses
      setBonus?.bonuses.forEach((statBonus) => {
        if (stats[statBonus.stat] !== undefined) {
          stats[statBonus.stat] += statBonus.value;
        } else {
          stats[statBonus.stat] = statBonus.value;
        }
      });

      // Special bonuses, has to be handled individually
      let extraBonus = setBonus?.bonusExtra;
      if (extraBonus !== undefined && extraBonus.type !== '') {
        let extraBonusSet =
          extraBonuses[extraBonus.type] ?? extraBonuses['defaultSetBonus'];

        let params = extraBonus.params;

        let extraStats = extraBonusSet.extraStatsFn?.(params) ?? [];

        extraStats.forEach((statBonus) => {
          if (stats[statBonus.stat] !== undefined) {
            stats[statBonus.stat] += statBonus.value;
          } else {
            stats[statBonus.stat] = statBonus.value;
          }
        });
      }
    });

    return stats;
  }

  getOptions(pieces: number, prevPieces?: number) {
    if (prevPieces === undefined || isNaN(prevPieces)) {
      const options = this.setBonuses.flatMap((setBonus) => setBonus.options);
      return options.map((Option) => new Option());
    } else if (pieces === prevPieces) {
      return this.options;
    } else if (pieces > prevPieces) {
      const oldOptionIds = this.options.map(({ id }) => id);
      const newOptions = this.setBonuses
        .flatMap((setBonus) => setBonus.options)
        .map((Option) => new Option())
        .filter(({ id }) => !oldOptionIds.includes(id));
      return this.options.concat(newOptions);
    } else {
      const keptOptionIds = this.setBonuses
        .flatMap((setBonus) => setBonus.options)
        .map((Option) => new Option().id);
      return this.options.filter(({ id }) => keptOptionIds.includes(id));
    }
  }

  getSetBonuses(): ArtifactSetBonus[] {
    const setBonusSets = this.setBonusSets;
    return setBonusSets.map((setBonusSet) => {
      const setBonusType = setBonusSet?.bonusExtra.type;
      return extraBonuses[setBonusType] ?? extraBonuses['defaultSetBonus'];
    });
  }

  getStatMixins(): StatMixin[] {
    return this.setBonuses
      .map(({ statMixin }) => statMixin)
      .filter((mixin): mixin is StatMixin => mixin !== undefined);
  }

  getModifierMixins(): ModifierMixin[] {
    return this.setBonuses
      .map(({ modifierMixin }) => modifierMixin)
      .filter((mixin): mixin is ModifierMixin => mixin !== undefined);
  }
}
