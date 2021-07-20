import Option from '../Option';

export default class ArtifactSetOption extends Option {
  threshold: number;

  constructor(id: string = '', threshold: number = 0) {
    super(id);
    this.threshold = threshold;
  }
}
