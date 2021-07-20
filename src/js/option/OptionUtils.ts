import { artifactSetOptions } from './artifactSetOptions';
import { characterOptions } from './characterOptions';
import Option, {
  IModifierApplicable,
  IOptionBoolean,
  IOptionNumber,
  IOptionPicker,
  IStatsApplicable,
} from './Option';

const defaultOptions: typeof Option[] = [];

// Type can be character, weapon, or artifact
export function getOptions(type: string, id: string) {
  switch (type) {
    case 'character':
      return characterOptions[id] ?? defaultOptions;
    case 'artifactSet':
      return artifactSetOptions[id] ?? defaultOptions;
    default:
      return defaultOptions;
  }
}

export function isBooleanOption(
  option: Option
): option is Option & IOptionBoolean {
  return typeof (option as unknown as IOptionBoolean).value === 'boolean';
}

export function isPickerOption(
  option: Option
): option is Option & IOptionPicker {
  return (option as unknown as IOptionPicker).choices !== undefined;
}

export function isNumberOption(
  option: Option
): option is Option & IOptionNumber {
  return typeof (option as unknown as IOptionNumber).value === 'number';
}

export function isStatsApplicable(
  option: Option
): option is Option & IStatsApplicable {
  return (option as unknown as IStatsApplicable).applyOnStats !== undefined;
}

export function isModifierApplicable(
  option: Option
): option is Option & IModifierApplicable {
  return (
    (option as unknown as IModifierApplicable).applyOnModifier !== undefined
  );
}
