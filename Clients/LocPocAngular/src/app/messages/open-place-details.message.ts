import { Message } from './message';

export class OpenPlaceDetailsMessage extends Message {
  addNew:  boolean;
  constructor(addNew: boolean) {
    super();
    this.addNew = addNew;
  }

  get Type(): string {
    return 'OpenPlaceDetailsMessage';
  }
}
