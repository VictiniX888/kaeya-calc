import Option from '../Option.js';

const dilucOptionInfusion = new Option({
  id: 'infusionPyro',
  type: 'boolean',
  value: false,

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = 'pyro';
    }
    return modifier;
  },
});

export default [dilucOptionInfusion];
