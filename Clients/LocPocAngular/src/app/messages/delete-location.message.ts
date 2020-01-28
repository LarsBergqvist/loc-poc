import { Message } from './message';

export class DeleteLocationMessage extends Message {
  id: string;
  constructor(id: string) {
    super();
    this.id = id;
  }

  get Type(): string {
    return 'DeleteLocationMessage';
  }
}
