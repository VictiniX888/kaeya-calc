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
  IStatsApplicable,
} from '../../option/Option';

const [{ params: c1Params }, , , { params: c4Params }] =
  getTalentData('eula').constellations;

class EulaOptionConstellation1
  extends CharacterOption
  implements IOptionBoolean, IStatsApplicable
{
  value = false;

  constructor() {
    super('eulaConstellation1');
  }

  statMixin = {
    apply: (stats: Stats) => {
      if (this.value) {
        stats.physicalDmgBonus = c1Params[0] + (stats.physicalDmgBonus ?? 0);
      }
    },
  };
}

const eulaConstellation1: Constellation = {
  constellationLevel: 1,
  options: [EulaOptionConstellation1],
};

const eulaConstellation3 = ConstellationBurst(3);

class EulaOptionConstellation4
  extends CharacterOption
  implements IOptionBoolean, IModifierApplicable
{
  value = false;

  constructor() {
    super('eulaConstellation4');
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value) {
        modifier.lightfallSwordDmgBonus = c4Params[0];
      }
    },
  };
}

const eulaConstellation4: Constellation = {
  constellationLevel: 4,
  options: [EulaOptionConstellation4],
};

const eulaConstellation5 = ConstellationSkill(5);

const eulaConstellations = [
  eulaConstellation1,
  eulaConstellation3,
  eulaConstellation4,
  eulaConstellation5,
];
export default eulaConstellations;
