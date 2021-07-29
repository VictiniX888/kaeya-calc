import ArtifactSetOption from './ArtifactSetOption';
import { getArtifactSetBonusParams } from '../../Data';
import { IModifierApplicable, IOptionPicker } from '../Option';
import DamageModifier from '../../modifier/DamageModifer';
import { Element } from '../../talent/types';

class ViridescentVenerer4PcOption
  extends ArtifactSetOption
  implements IOptionPicker, IModifierApplicable
{
  value = '';
  choices = [Element.Cryo, Element.Electro, Element.Hydro, Element.Pyro];

  constructor() {
    super('viridescentVenerer4Pc', 4);
  }

  applyOnModifier(modifier: DamageModifier) {
    if (this.value !== '') {
      const params = getArtifactSetBonusParams('viridescentvenerer', 4);
      modifier.enemyResReduction.add(this.value as Element, params[1]);
    }
  }
}

const viridescentVenererOptions = [ViridescentVenerer4PcOption];
export default viridescentVenererOptions;
