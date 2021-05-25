import * as characterOptions from './characterOptions';

const defaultOptions = [];

// Type can be character, weapon, or artifact
export function getOptions(type, id) {
  switch (type) {
    case 'character':
      return characterOptions[id] ?? defaultOptions;
    default:
      return defaultOptions;
  }
}
