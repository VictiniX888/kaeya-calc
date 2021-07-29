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

export function getCharacterOptions(id: string) {
  return characterOptions[id] ?? defaultOptions;
}

export function getArtifactSetOptions(id: string) {
  return artifactSetOptions[id] ?? defaultOptions;
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
