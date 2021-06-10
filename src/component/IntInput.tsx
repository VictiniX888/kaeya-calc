import NumberInput from './NumberInput';

class IntInput extends NumberInput {
  override parseInput = (value: string) => {
    return parseInt(value);
  };
}

export default IntInput;
