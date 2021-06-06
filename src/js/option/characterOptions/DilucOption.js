import CharacterOption from './CharacterOption';

const dilucOptionInfusion = new CharacterOption({
  id: 'infusionPyro',
  type: 'boolean',
  initialValue: false,

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = 'pyro';
    }
  },
});

const dilucOptions = [dilucOptionInfusion];
export default dilucOptions;
