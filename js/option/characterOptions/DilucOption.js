import Option from '../Option.js';

const dilucOptionInfusion = new Option({
  id: 'infusion',
  type: 'boolean',
  value: false,

  applyOnModifier: (modifier, value) => {
    if (value === true) {
      modifier.infusion = true;
    }
    return modifier;
  },
});

export default [dilucOptionInfusion];
