import CharacterOption from './CharacterOption';

const chongyunOptionInfusion = new CharacterOption({
  id: 'infusionCryo',
  type: 'boolean',
  initialValue: false,

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = 'cryo';
    }
  },
});

const chongyunOptions = [chongyunOptionInfusion];
export default chongyunOptions;
