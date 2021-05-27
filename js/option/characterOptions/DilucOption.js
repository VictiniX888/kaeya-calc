import Option from '../Option.js';

const dilucOptionInfusion = new Option({
  id: 'infusionPyro',
  type: 'boolean',
  initialValue: false,

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = 'pyro';
    }
  },
});

export default [dilucOptionInfusion];
