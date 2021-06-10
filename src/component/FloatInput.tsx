import NumberInput from './NumberInput';

class FloatInput extends NumberInput {
  override parseInput = (value: string) => {
    return parseFloat(value);
  };
}

export default FloatInput;
