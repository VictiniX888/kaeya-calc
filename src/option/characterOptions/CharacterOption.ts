import Option from '../Option';

export default class CharacterOption extends Option {
  children: CharacterOption[];

  constructor(id: string = '', children: typeof CharacterOption[] = []) {
    super(id);
    this.children = children.map((Option) => new Option());
  }

  unroll(): CharacterOption[] {
    return [this, ...this.children.flatMap((option) => option.unroll())];
  }
}
