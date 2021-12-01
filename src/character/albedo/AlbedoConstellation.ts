import Constellation, {
  ConstellationBurst,
  ConstellationSkill,
} from '../../constellation/Constellation';
import { getTalentData } from '../../data/Data';
import { Stats } from '../../data/types';
import DamageModifier from '../../modifier/DamageModifer';
import CharacterOption from '../../option/characterOptions/CharacterOption';
import {
  IModifierApplicable,
  IOptionBoolean,
  IOptionNumber,
  IStatsApplicable,
} from '../../option/Option';

const [, { params: c2Params }] = getTalentData('albedo').constellations;

class AlbedoOptionConstellation2
  extends CharacterOption
  implements IOptionNumber, IModifierApplicable
{
  value = 0;

  constructor() {
    super('albedoConstellation2');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier, stats: Stats) => {
      if (this.value > 0) {
        let stacks = this.value;
        if (stacks > 4) {
          stacks = 4;
        }

        modifier.burstFlatDmg =
          c2Params[0] * stats.flatDef * stacks + (modifier.burstFlatDmg ?? 0);
      }
    },
  };
}

const albedoConstellation2: Constellation = {
  constellationLevel: 2,
  options: [AlbedoOptionConstellation2],
};

const albedoConstellation3 = ConstellationSkill(3);

export function AlbedoOptionConstellation4(id?: string) {
  return class AlbedoOptionConstellation4
    extends CharacterOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super(id ?? 'albedoConstellation4');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value) {
          stats.plungeDmgBonus = 0.3 + (stats.plungeDmgBonus ?? 0);
        }
      },
    };
  };
}

const albedoConstellation4: Constellation = {
  constellationLevel: 4,
  options: [AlbedoOptionConstellation4()],
};

const albedoConstellation5 = ConstellationBurst(5);

export function AlbedoOptionConstellation6(id?: string) {
  return class AlbedoOptionConstellation6
    extends CharacterOption
    implements IOptionBoolean, IStatsApplicable
  {
    value = false;

    constructor() {
      super(id ?? 'albedoConstellation6');
    }

    statMixin = {
      apply: (stats: Stats) => {
        if (this.value) {
          stats.dmgBonus = 0.17 + (stats.dmgBonus ?? 0);
        }
      },
    };
  };
}

const albedoConstellation6: Constellation = {
  constellationLevel: 6,
  options: [AlbedoOptionConstellation6()],
};

const albedoConstellations = [
  albedoConstellation2,
  albedoConstellation3,
  albedoConstellation4,
  albedoConstellation5,
  albedoConstellation6,
];
export default albedoConstellations;
