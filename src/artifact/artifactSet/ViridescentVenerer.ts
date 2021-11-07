import { getArtifactSetBonusParams } from '../../data/Data';
import ArtifactSet from '../ArtifactSet';
import { ArtifactSetBonus } from '../types';
import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';
import ArtifactSetOption from '../../option/artifactSetOptions/ArtifactSetOption';
import { IOptionPicker, IModifierApplicable } from '../../option/Option';

export default class ViridescentVenerer extends ArtifactSet {
  getAllSetBonuses(): ArtifactSetBonus[] {
    return [viridescentVenerer4Pc];
  }
}

const params4Pc = getArtifactSetBonusParams('viridescentvenerer', 4);

export class ViridescentVenerer4PcOption
  extends ArtifactSetOption
  implements IOptionPicker, IModifierApplicable
{
  value = '';
  choices = [Element.Cryo, Element.Electro, Element.Hydro, Element.Pyro];

  constructor() {
    super('viridescentVenerer4Pc', 4);
  }

  modifierMixin = {
    apply: (modifier: DamageModifier) => {
      if (this.value !== '') {
        modifier.enemyResReduction.add(this.value as Element, params4Pc[1]);
      }
    },
  };
}

const viridescentVenerer4Pc: ArtifactSetBonus = {
  pieces: 4,

  options: [ViridescentVenerer4PcOption],

  // Swirl Dmg up not yet implemented. Medium priority.
  // Requires reaction dmg to be implemented first.
};
