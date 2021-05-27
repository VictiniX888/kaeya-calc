import Option from '../Option.js';

const chongyunOptionInfusion = new Option({
  id: 'infusionCryo',
  type: 'boolean',
  value: false,

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = 'cryo';
    }
  },
});

export default [chongyunOptionInfusion];
