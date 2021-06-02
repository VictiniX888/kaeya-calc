import * as characterOptions from './characterOptions';
import * as artifactSetOptions from './artifactSetOptions';

const defaultOptions = [];

// Type can be character, weapon, or artifact
export function getOptions(type, id) {
  switch (type) {
    case 'character':
      return characterOptions[id] ?? defaultOptions;
    case 'artifactSet':
      return artifactSetOptions[id] ?? defaultOptions;
    default:
      return defaultOptions;
  }
}
