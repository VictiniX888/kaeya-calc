import Option from '../Option';

export default class CharacterOption extends Option {
  constructor(id?: string) {
    if (id !== undefined) {
      super(id);
    } else {
      super('');
    }
  }
}
